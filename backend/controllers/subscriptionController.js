const Subscription = require('../models/Subscription');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const dayjs = require('dayjs');

// @desc    Get all subscription plans
// @route   GET /api/v1/subscriptions
// @access  Public
exports.getAllSubscriptions = asyncHandler(async (req, res, next) => {
  const subscriptions = await Subscription.find();
  res.status(200).json({ success: true, data: subscriptions });
});

// @desc    Allow a user to subscribe to a plan
// @route   POST /api/v1/subscriptions/:id/subscribe
// @access  Private
exports.subscribeUser = asyncHandler(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ErrorResponse(`Subscription not found with id of ${req.params.id}`, 404));
  }

  const user = await User.findById(req.user.id);

  // Update user's subscription details
  user.subscription = subscription._id;
  user.subscriptionEndDate = dayjs().add(subscription.durationInDays, 'day').toDate();
  
  await user.save();

  res.status(200).json({ success: true, data: user });
});