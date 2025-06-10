const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  animalId: { type: String, ref: 'Animal', required: true },
  motivo: String,
  observaciones: String,
  responsable: String,
  fechaTraslado: { type: Date, default: Date.now },
  geolocalizacionAnteriorId: { type: String, ref: 'Geolocalizacion' },
  geolocalizacionNuevaId: { type: String, ref: 'Geolocalizacion' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Transfer', TransferSchema);
