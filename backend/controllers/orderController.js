const Order = require('../models/Order');
const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Place a new order
exports.placeOrder = asyncHandler(async (req, res, next) => {
  const { items, address, pickupDate } = req.body;

  if (!items || items.length === 0 || !address || !pickupDate) {
    return next(new ErrorResponse('Please provide order items, address, and pickup date', 400));
  }

  let totalPrice = 0;
  const processedItems = [];

  for (const item of items) {
    const service = await Service.findById(item.service);
    if (!service) {
      return next(new ErrorResponse(`Service not found with id of ${item.service}`, 404));
    }
    totalPrice += service.pricePerItem * item.quantity;
    processedItems.push({ service: item.service, quantity: item.quantity });
  }

  const order = await Order.create({
    user: req.user.id,
    items: processedItems,
    totalPrice,
    address,
    pickupDate,
  });

  res.status(201).json({ success: true, data: order });
});

// @desc    Get all orders (for Admins)
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email');
  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// @desc    Get orders for the logged-in user
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({ success: true, count: orders.length, data: orders });
});