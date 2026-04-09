const express = require('express');
const router = express.Router();

const ad = require('../controllers/ads.controller');

router.get('/ads', ad.getAll);

router.get('/ads/:id', ad.getById);

router.post('/ads', ad.newAd);

router.put('/ads/:id', ad.edit);

router.delete('/ads/:id', ad.delete);

router.get('/ads/search/:searchPhrase', ad.getBySearch);


module.exports = router;