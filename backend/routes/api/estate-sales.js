'use strict';

const express = require('express');
require('express-async-errors');
const { Op } = require('sequelize');

const {
  EstateSale,
  EstateSaleImage,
  Account,
  ZipCode
} = require('../../db/models');

const { requireAuth } = require('../../utils/auth'); // adjust if your path differs

const router = express.Router();

/**
 * LIST (public)
 * GET /api/estate-sales?status=published&zipCode=33101&creatorAccountId=1&q=garage&limit=20&offset=0
 */
router.get('/', async (req, res) => {
  const {
    status,
    zipCode,
    creatorAccountId,
    q,
    limit = 20,
    offset = 0
  } = req.query;

  const where = {};
  if (status) where.status = status;
  if (zipCode) where.zipCode = zipCode;
  if (creatorAccountId) where.creatorAccountId = Number(creatorAccountId);
  if (q) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${q}%` } },
      { description: { [Op.iLike]: `%${q}%` } }
    ];
  }

  const rows = await EstateSale.findAll({
    where,
    limit: Math.min(Number(limit) || 20, 50),
    offset: Number(offset) || 0,
    order: [['createdAt', 'DESC']],
    include: [
      { model: EstateSaleImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] },
      { model: ZipCode, as: 'zip', required: false } // only if you set this association
    ]
  });

  res.json({ estateSales: rows });
});

/**
 * GET ONE (public)
 * GET /api/estate-sales/:id
 */
router.get('/:id', async (req, res) => {
  const estateSale = await EstateSale.findByPk(req.params.id, {
    include: [
      { model: EstateSaleImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] },
      { model: ZipCode, as: 'zip', required: false }
    ]
  });

  if (!estateSale) return res.status(404).json({ message: 'Estate sale not found' });
  res.json({ estateSale });
});

/**
 * CREATE (auth)
 * POST /api/estate-sales
 */
router.post('/', requireAuth, async (req, res) => {
  const creatorAccountId = req.user.id;

  const {
    title,
    description,
    startAt,
    endAt,
    streetAddress,
    city,
    state,
    zipCode,
    latitude,
    longitude,
    showExactFrom,
    status,
    maxImagesAllowed
  } = req.body;

  const estateSale = await EstateSale.create({
    creatorAccountId,
    title,
    description,
    startAt,
    endAt,
    streetAddress,
    city,
    state,
    zipCode,
    latitude,
    longitude,
    showExactFrom,
    status: status || 'draft',
    maxImagesAllowed
  });

  const full = await EstateSale.findByPk(estateSale.id, {
    include: [
      { model: EstateSaleImage, as: 'images' },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
    ]
  });

  res.status(201).json({ estateSale: full });
});

/**
 * UPDATE (auth + owner)
 * PUT /api/estate-sales/:id
 */
router.put('/:id', requireAuth, async (req, res) => {
  const estateSale = await EstateSale.findByPk(req.params.id);
  if (!estateSale) return res.status(404).json({ message: 'Estate sale not found' });

  if (estateSale.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const fields = [
    'title',
    'description',
    'startAt',
    'endAt',
    'streetAddress',
    'city',
    'state',
    'zipCode',
    'latitude',
    'longitude',
    'showExactFrom',
    'status',
    'maxImagesAllowed'
  ];

  const updates = {};
  for (const f of fields) {
    if (Object.prototype.hasOwnProperty.call(req.body, f)) updates[f] = req.body[f];
  }

  await estateSale.update(updates);

  const full = await EstateSale.findByPk(estateSale.id, {
    include: [
      { model: EstateSaleImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] },
      { model: Account, as: 'creator', attributes: ['id', 'username', 'firstName', 'lastName'] }
    ]
  });

  res.json({ estateSale: full });
});

/**
 * DELETE (auth + owner)
 * DELETE /api/estate-sales/:id
 */
router.delete('/:id', requireAuth, async (req, res) => {
  const estateSale = await EstateSale.findByPk(req.params.id);
  if (!estateSale) return res.status(404).json({ message: 'Estate sale not found' });

  if (estateSale.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await estateSale.destroy();
  res.json({ message: 'Deleted' });
});

/**
 * ADD IMAGES (auth + owner)
 * POST /api/estate-sales/:id/images
 * body: { images: [{ imageUrl, storageKey, sortOrder }] }
 */
router.post('/:id/images', requireAuth, async (req, res) => {
  const estateSale = await EstateSale.findByPk(req.params.id);
  if (!estateSale) return res.status(404).json({ message: 'Estate sale not found' });

  if (estateSale.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const images = Array.isArray(req.body.images) ? req.body.images : [];
  const payload = images.map((img, idx) => ({
    estateSaleId: estateSale.id,
    imageUrl: img.imageUrl,
    storageKey: img.storageKey || null,
    sortOrder: Number.isFinite(img.sortOrder) ? img.sortOrder : idx
  }));

  if (!payload.length) return res.status(400).json({ message: 'images array required' });

  await EstateSaleImage.bulkCreate(payload, { validate: true });

  const refreshed = await EstateSale.findByPk(estateSale.id, {
    include: [{ model: EstateSaleImage, as: 'images', separate: true, order: [['sortOrder', 'ASC']] }]
  });

  res.status(201).json({ estateSale: refreshed });
});

/**
 * DELETE IMAGE (auth + owner)
 * DELETE /api/estate-sales/:id/images/:imageId
 */
router.delete('/:id/images/:imageId', requireAuth, async (req, res) => {
  const estateSale = await EstateSale.findByPk(req.params.id);
  if (!estateSale) return res.status(404).json({ message: 'Estate sale not found' });

  if (estateSale.creatorAccountId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const img = await EstateSaleImage.findOne({
    where: { id: req.params.imageId, estateSaleId: estateSale.id }
  });

  if (!img) return res.status(404).json({ message: 'Image not found' });

  await img.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
