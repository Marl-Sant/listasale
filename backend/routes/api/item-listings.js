const express = require('express');
require('express-async-errors');
const { Op } = require('sequelize');

const {
  ItemListing,
  ItemListingImage,
  ItemListingInterest,
  Account
} = require('../../db/models');

const { requireAuth } = require('../../utils/auth'); // adjust if your path differs

const router = express.Router();

/**
 * LIST (public)
 * GET /api/item-listings?status=active&zipCode=33101&creatorAccountId=1&q=table&limit=20&offset=0
 */
router.get('/', async (req, res) => {
  const {
    status,
    zipCode,
    state,
    city,
    creatorAccountId,
    q,
    limit = 20,
    offset = 0
  } = req.query;

  const where = {};
  if (status) where.status = status;
  if (zipCode) where.zipCode = String(zipCode);
  if (state) where.state = String(state);
  if (city) where.city = String(city);
  if (creatorAccountId) where.creatorAccountId = Number(creatorAccountId);

  if (q) {
    where[Op.or] = [
      { title: { [Op.like]: `%${q}%` } },
      { description: { [Op.like]: `%${q}%` } }
    ];
  }

  const rows = await ItemListing.findAll({
    where,
    limit: Math.min(Number(limit) || 20, 50),
    offset: Number(offset) || 0,
    order: [['createdAt', 'DESC']],
    include: [
      { model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
    ]
  });

  res.json({ itemListings: rows });
});

/**
 * GET ONE (public)
 * GET /api/item-listings/:id
 */
router.get('/:id', async (req, res) => {
  const itemListing = await ItemListing.findByPk(req.params.id, {
    include: [
      { model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
    ]
  });

  if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });
  res.json({ itemListing });
});

/**
 * CREATE (auth)
 * POST /api/item-listings
 */
router.post('/', requireAuth, async (req, res) => {
  const creatorAccountId = req.user.id;

  const {
    title,
    description,
    priceCents,
    currency,
    condition,
    city,
    state,
    zipCode,
    status,
    postedAt,
    refreshedAt,
    soldAt,
    autoRefreshEnabled
  } = req.body;

  const itemListing = await ItemListing.create({
    creatorAccountId,
    title,
    description,
    priceCents,
    currency: currency || 'USD',
    condition,
    city,
    state,
    zipCode,
    status: status || 'active',
    postedAt: postedAt || new Date(),
    refreshedAt: refreshedAt || null,
    soldAt: soldAt || null,
    autoRefreshEnabled: !!autoRefreshEnabled
  });

  const full = await ItemListing.findByPk(itemListing.id, {
    include: [
      { model: ItemListingImage, as: 'images' },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
    ]
  });

  res.status(201).json({ itemListing: full });
});

/**
 * UPDATE (auth + owner)
 * PUT /api/item-listings/:id
 */
router.put('/:id', requireAuth, async (req, res) => {
  const itemListing = await ItemListing.findByPk(req.params.id);
  if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

  if (itemListing.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const fields = [
    'title',
    'description',
    'priceCents',
    'currency',
    'condition',
    'city',
    'state',
    'zipCode',
    'status',
    'postedAt',
    'refreshedAt',
    'soldAt',
    'autoRefreshEnabled'
  ];

  const updates = {};
  for (const f of fields) {
    if (Object.prototype.hasOwnProperty.call(req.body, f)) updates[f] = req.body[f];
  }

  await itemListing.update(updates);

  const full = await ItemListing.findByPk(itemListing.id, {
    include: [
      { model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
    ]
  });

  res.json({ itemListing: full });
});

/**
 * DELETE (auth + owner)
 * DELETE /api/item-listings/:id
 */
router.delete('/:id', requireAuth, async (req, res) => {
  const itemListing = await ItemListing.findByPk(req.params.id);
  if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

  if (itemListing.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await itemListing.destroy();
  res.json({ message: 'Deleted' });
});

/**
 * ADD IMAGES (auth + owner)
 * POST /api/item-listings/:id/images
 * body: { images: [{ imageUrl, storageKey, sortOrder }] }
 */
router.post('/:id/images', requireAuth, async (req, res) => {
  const itemListing = await ItemListing.findByPk(req.params.id);
  if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

  if (itemListing.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const images = Array.isArray(req.body.images) ? req.body.images : [];
  const payload = images.map((img, idx) => ({
    itemListingId: itemListing.id,
    imageUrl: img.imageUrl,
    storageKey: img.storageKey || null,
    sortOrder: Number.isFinite(img.sortOrder) ? img.sortOrder : idx
  }));

  if (!payload.length) return res.status(400).json({ message: 'images array required' });

  await ItemListingImage.bulkCreate(payload, { validate: true });

  const refreshed = await ItemListing.findByPk(itemListing.id, {
    include: [{ model: ItemListingImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] }]
  });

  res.status(201).json({ itemListing: refreshed });
});

/**
 * DELETE IMAGE (auth + owner)
 * DELETE /api/item-listings/:id/images/:imageId
 */
router.delete('/:id/images/:imageId', requireAuth, async (req, res) => {
  const itemListing = await ItemListing.findByPk(req.params.id);
  if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

  if (itemListing.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const img = await ItemListingImage.findOne({
    where: { id: req.params.imageId, itemListingId: itemListing.id }
  });

  if (!img) return res.status(404).json({ message: 'Image not found' });

  await img.destroy();
  res.json({ message: 'Deleted' });
});

/**
 * EXPRESS INTEREST (auth)
 * POST /api/item-listings/:id/interests
 */
router.post('/:id/interests', requireAuth, async (req, res) => {
  const itemListing = await ItemListing.findByPk(req.params.id);
  if (!itemListing) return res.status(404).json({ message: 'Item listing not found' });

  const {
    message,
    offerCents,
    buyoutRequested,
    buyerNameSnapshot,
    buyerEmailSnapshot,
    buyerPhoneSnapshot
  } = req.body;

  const interest = await ItemListingInterest.create({
    itemListingId: itemListing.id,
    interestedAccountId: req.user.id,
    message: message || null,
    offerCents: offerCents ?? null,
    buyoutRequested: !!buyoutRequested,
    buyerNameSnapshot: buyerNameSnapshot || null,
    buyerEmailSnapshot: buyerEmailSnapshot || req.user.email || null,
    buyerPhoneSnapshot: buyerPhoneSnapshot || null
  });

  res.status(201).json({ interest });
});

module.exports = router;
