const express = require('express');
const router = express.Router();
const {
  getAllSubscriptions,
  subscribeUser,
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

router.route('/').get(getAllSubscriptions);
router.route('/:id/subscribe').post(protect, subscribeUser);

module.exports = router;