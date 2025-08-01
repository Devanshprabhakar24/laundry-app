// backend/middleware/asyncHandler.js or backend/utils/asyncHandler.js
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
