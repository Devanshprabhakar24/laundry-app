const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerItem: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Service', serviceSchema);
