const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getMyOrders,
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/auth');

router.route('/').post(protect, placeOrder).get(protect, isAdmin, getAllOrders);
router.route('/myorders').get(protect, getMyOrders); // ✅ Add this line for user dashboard

module.exports = router;