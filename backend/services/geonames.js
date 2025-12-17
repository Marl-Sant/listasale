'use strict';
const { City, ZipCode, sequelize } = require('../db/models');
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;

// GeoNames: postalCodeSearchJSON is best for ZIP/city lookups
// Example: http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=331&country=US&maxRows=10&username=XXXX
async function geonamesZipSearch(zipPrefix, limit = 10) {
  if (!GEONAMES_USERNAME)
    throw new Error('Missing GEONAMES_USERNAME');

  const url =
    `https://secure.geonames.org/postalCodeSearchJSON` +
    `?postalcode_startsWith=${encodeURIComponent(zipPrefix)}` +
    `&country=US&maxRows=${limit}&username=${encodeURIComponent(
      GEONAMES_USERNAME
    )}`;

  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`GeoNames ZIP search failed: ${res.status}`);
  const data = await res.json();

  const rows = data.postalCodes || [];
  return rows.map((r) => ({
    zip: r.postalCode,
    city: r.placeName,
    state: r.adminCode1,
    country: r.countryCode || 'US',
    // GeoNames provides lat/lng at the postal entry
    zipLat: r.lat != null ? Number(r.lat) : null,
    zipLng: r.lng != null ? Number(r.lng) : null,
    // Sometimes there is a place id; not always consistent for US postal results
    geonamesId: r.placeName ? null : null,
    // City lat/lng: you can reuse zip lat/lng as a fallback
    cityLat: r.lat != null ? Number(r.lat) : null,
    cityLng: r.lng != null ? Number(r.lng) : null,
  }));
}

// GeoNames city search: searchJSON
async function geonamesCitySearch(q, state, limit = 10) {
  if (!GEONAMES_USERNAME)
    throw new Error('Missing GEONAMES_USERNAME');

  // Bias to US populated places; you can tune featureClass/featureCode
  const url =
    // `https://secure.geonames.org/searchJSON` +
    // `?q=${encodeURIComponent(q)}` +
    // `&country=US` +
    // `&featureClass=P` +
    // `&maxRows=${limit}` +
    // `&username=${encodeURIComponent(GEONAMES_USERNAME)}`;
    `https://secure.geonames.org/postalCodeSearchJSON` +
    `?placename_startsWith=${encodeURIComponent(q)}` +
    `&country=US&state=${state}maxRows=${limit}&username=${encodeURIComponent(
      GEONAMES_USERNAME
    )}`;

    console.log(`!#!!#$#!%#$# ${q} 2@$%#%$$$#$%^$#%##%^$#`)

  const res = await fetch(url);
  if (!res.ok)
    throw new Error(
      `GeoNames city search failed: ${res.status}`
    );
  const data = await res.json();
  console.log(`@$#$%##$@$%#$% ${data.postalCodes} #$@%@$#%$$#$#`)

  const rows = data.postalCodes || [];
  const mapped = rows.map((r) => ({
    city: r.placeName,
    state: r.adminCode1 || '',
    country: r.countryCode || 'US',
    geonamesId: r.geonameId || null,
    cityLat: r.lat != null ? Number(r.lat) : null,
    cityLng: r.lng != null ? Number(r.lng) : null,
  }));

  // Optional state filter
  return state
    ? mapped.filter((x) => x.state === state)
    : mapped;
}

async function upsertCityAndZip({
  zipCode,
  cityName,
  state,
  country = 'US',
  latitude,
  longitude,
}) {
  return sequelize.transaction(async (t) => {
    const name = cityName?.trim();
    const st = state?.trim().toUpperCase();
    const ctry = country?.trim().toUpperCase();

    if (!name || !st) throw new Error('Missing city/state');

    // 1) City first
    const [city] = await City.findOrCreate({
      where: { name, state: st, country: ctry },
      defaults: {
        name,
        state: st,
        country: ctry,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
      },
      transaction: t,
    });

    // 2) Zip second (ZipCode hook will normalize + validate)
    const [zip] = await ZipCode.findOrCreate({
      where: { zipCode: String(zipCode).trim() },
      defaults: {
        zipCode: String(zipCode).trim(),
        cityId: city.id,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
      },
      transaction: t,
    });

    // If zip already existed but cityId differs, you can decide if you want to update:
    if (zip.cityId !== city.id) {
      await zip.update({ cityId: city.id }, { transaction: t });
    }

    return { city, zip };
  });
}

module.exports = {
  geonamesZipSearch,
  geonamesCitySearch,
  upsertCityAndZip,
};
