const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload')

const ad = require('../controllers/ads.controller');

router.get('/ads', ad.getAll);

router.get('/ads/:id', ad.getById);

router.post('/ads', imageUpload.single('image'), ad.newAd);

router.put('/ads/:id', imageUpload.single('image'), ad.edit);

router.delete('/ads/:id', ad.delete);

router.get('/ads/search/:searchPhrase', ad.getBySearch);


module.exports = router;