const express = require('express');
const router = express.Router();
const { getAllServices } = require('../controllers/serviceController');

router.get('/', getAllServices); // GET /api/v1/services

module.exports = router;
