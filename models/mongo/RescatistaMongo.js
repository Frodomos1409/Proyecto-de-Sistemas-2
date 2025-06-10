const mongoose = require('mongoose');

const RescatistaSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  fechaRescatista: { type: Date, required: true },
  imagen: { type: String },
  animales: [{ type: String, ref: 'Animal' }],
  geolocalizacionId: { type: String, ref: 'Geolocalizacion' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Rescatista', RescatistaSchema);
