const express = require('express');

const router = express.Router();

const locationController = require('../controllers/location-controller');

router.get('/locations/:address?', locationController);

module.exports = router;
