const express = require('express');
const router = express.Router();
const controller = require('../controllers/shorturlController');

// 1. Create short URL
router.post('/shorturls', controller.createShortUrl);
// 2. Get stats for a shortcode
router.get('/shorturls/:shortcode', controller.getStats);

// 3. Redirect to original URL
router.get('/:shortcode', controller.redirectShortUrl);

module.exports = router;
