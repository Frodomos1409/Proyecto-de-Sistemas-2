const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  animalId: { type: String, ref: 'Animal', required: true },
  estado: String,
  nombreAdoptante: String,
  contactoAdoptante: String,
  observaciones: String,
  fechaAdopcion: { type: Date, default: Date.now },
  geolocalizacionId: { type: String, ref: 'Geolocalizacion' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);
