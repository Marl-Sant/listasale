'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  City,
  ZipCode,
  ZipCodeCity,
} = require('../../db/models'); // adjust to your export names
const {
  geonamesCitySearch,
  geonamesZipSearch,
} = require('../../services/geonames');
const router = express.Router();

/**
 * GET /api/locations/autocomplete
 * q=miam&type=city&state=FL&limit=10
 * q=331&type=zip&limit=10
 */
router.get('/autocomplete', async (req, res, next) => {
  try {
    const qRaw = (req.query.q || '').toString().trim();
    const type = (req.query.type || '').toString().trim(); // 'city' | 'zip'
    const state = (req.query.state || '')
      .toString()
      .trim()
      .toUpperCase();
    const limit = Math.min(
      parseInt(req.query.limit || '10', 10) || 10,
      25
    );

    if (!qRaw || !type)
      return res
        .status(400)
        .json({ error: 'q and type are required' });

    let results = [];

    if (type === 'zip') {
      results = await searchZipFromDb(qRaw, limit);

      if (results.length >= Math.min(limit, 6)) {
        return res.json({ source: 'db', results });
      }

      const apiResults = await hydrateZipFromGeonames(
        qRaw,
        limit
      );
      return res.json({
        source: results.length ? 'db+geonames' : 'geonames',
        results: mergeUnique(results, apiResults, limit),
      });
    }

    if (type === 'city') {
      results = await searchCityFromDb(qRaw, state, limit);

      if (results.length >= Math.min(limit, 6)) {
        return res.json({ source: 'db', results });
      }

      const apiResults = await hydrateCityFromGeonames(
        qRaw,
        state,
        limit
      );
      return res.json({
        source: results.length ? 'db+geonames' : 'geonames',
        results: mergeUnique(results, apiResults, limit),
      });
    }

    return res
      .status(400)
      .json({ error: "type must be 'zip' or 'city'" });
  } catch (err) {
    next(err);
  }
});

async function searchZipFromDb(q, limit) {
  const normalized = q.replace(/[^\d-]/g, '');
  const rows = await ZipCode.findAll({
    where: { zipCode: { [Op.like]: `${normalized}%` } },
    limit,
    include: [
      { model: City, as: 'cities', through: { attributes: [] } },
    ],
    order: [['zipCode', 'ASC']],
  });

  return rows.map((r) => {
    const cities = r.cities || [];
    const firstCity = cities[0];

    return {
      kind: 'zip',
      zip: r.zipCode,
      cities: cities.map((c) => ({
        cityId: c.id,
        city: c.name,
        state: c.state,
        country: c.country || 'US',
        lat: c.latitude ?? null,
        lng: c.longitude ?? null,
      })),
      // convenience “display” fields (optional)
      city: firstCity?.name || '',
      state: firstCity?.state || '',
      country: firstCity?.country || 'US',
      lat: r.latitude ?? firstCity?.latitude ?? null,
      lng: r.longitude ?? firstCity?.longitude ?? null,
    };
  });
}

async function searchCityFromDb(q, state, limit) {
  const where = {
    name: { [Op.like]: `%${q}%` },
    country: 'US',
  };
  if (state) where.state = state;

  const rows = await City.findAll({
    where,
    limit,
    order: [['name', 'ASC']],
  });

  return rows.map((c) => ({
    kind: 'city',
    city: c.name,
    state: c.state,
    country: c.country,
    lat: c.latitude ?? null,
    lng: c.longitude ?? null,
    cityId: c.id,
  }));
}

async function hydrateZipFromGeonames(q, limit) {
  const normalized = q.replace(/[^\d]/g, '');
  const api = await geonamesZipSearch(normalized, limit);

  const out = [];

  for (const r of api) {
    const city = await findOrCreateCity({
      name: r.city,
      state: r.state,
      country: r.country,
      geonamesId: r.geonamesId,
      latitude: r.cityLat,
      longitude: r.cityLng,
    });

    const zip = await findOrCreateZip({
      zipCode: r.zip,
      latitude: r.zipLat,
      longitude: r.zipLng,
    });

    // ✅ CRITICAL: create the join row
    await linkZipToCity(zip.zipCode, city.id);

    out.push({
      kind: 'zip',
      zip: zip.zipCode,
      cities: [
        {
          cityId: city.id,
          city: city.name,
          state: city.state,
          country: city.country || 'US',
          lat: city.latitude ?? null,
          lng: city.longitude ?? null,
        },
      ],
      city: city.name,
      state: city.state,
      country: city.country || 'US',
      lat: zip.latitude ?? city.latitude ?? null,
      lng: zip.longitude ?? city.longitude ?? null,
      cityId: city.id,
    });
  }

  return out;
}

async function hydrateCityFromGeonames(q, state, limit) {
  const api = await geonamesCitySearch(q, state, limit);
  console.log(api);
  const out = [];

  for (const r of api) {
    console.log(r);
    const city = await findOrCreateCity({
      name: r.city,
      state: r.state,
      country: r.country,
      geonamesId: r.geonamesId,
      latitude: r.cityLat,
      longitude: r.cityLng,
    });

    out.push({
      kind: 'city',
      city: city.name,
      state: city.state,
      country: city.country,
      lat: city.latitude ?? null,
      lng: city.longitude ?? null,
      cityId: city.id,
    });
  }

  return out;
}

async function findOrCreateCity({
  name,
  state,
  country,
  geonamesId,
  latitude,
  longitude,
}) {
  const [city] = await City.findOrCreate({
    where: { name, state, country },
    defaults: { geonamesId, latitude, longitude },
  });

  const needsUpdate =
    (geonamesId && !city.geonamesId) ||
    (latitude != null && city.latitude == null) ||
    (longitude != null && city.longitude == null);

  if (needsUpdate) {
    await city.update({
      geonamesId: city.geonamesId || geonamesId,
      latitude: city.latitude ?? latitude,
      longitude: city.longitude ?? longitude,
    });
  }

  return city;
}

async function findOrCreateZip({
  zipCode,
  latitude,
  longitude,
}) {
  const [zip] = await ZipCode.findOrCreate({
    where: { zipCode },
    defaults: { latitude, longitude },
  });

  const updates = {};
  if (zip.latitude == null && latitude != null)
    updates.latitude = latitude;
  if (zip.longitude == null && longitude != null)
    updates.longitude = longitude;

  if (Object.keys(updates).length) await zip.update(updates);
  return zip;
}

async function linkZipToCity(zipCode, cityId) {
  // Join table PK should be (zipCode, cityId)
  await ZipCodeCity.findOrCreate({
    where: { zipCode, cityId },
    defaults: { zipCode, cityId },
  });
}

function mergeUnique(a, b, limit) {
  const seen = new Set();
  const out = [];

  for (const item of [...a, ...b]) {
    const key =
      item.kind === 'zip'
        ? `zip:${item.zip}`
        : `city:${item.city}:${item.state}:${item.country}`;

    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= limit) break;
  }

  return out;
}

module.exports = router;
