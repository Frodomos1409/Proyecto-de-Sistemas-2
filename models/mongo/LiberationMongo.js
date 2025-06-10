const mongoose = require('mongoose');

const LiberationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  animalId: { type: String, ref: 'Animal', required: true },
  fechaLiberacion: { type: Date, required: true },
  observaciones: String,
  geolocalizacionId: { type: String, ref: 'Geolocalizacion' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Liberation', LiberationSchema);
