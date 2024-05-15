const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  validFrom: {
    type: String,
    required: true
  },
  validUntil: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Phone', phoneSchema);
