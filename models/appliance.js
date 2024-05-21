const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applianceSchema = new Schema({
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
 
  image: {
    type: String,
    required: false // Le champ image peut être optionnel
  }
});
module.exports = mongoose.model('appliance', applianceSchema);
