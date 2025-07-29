const Service = require('../models/Service');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllServices = asyncHandler(async (req, res, next) => {
  const services = await Service.find();
  
  // ✅ Corrected to send a consistent response object
  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});