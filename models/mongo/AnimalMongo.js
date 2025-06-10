const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // UUID
  nombre: { type: String, required: true },
  especie: String,
  raza: String,
  sexo: String,
  edad: Number,
  estadoSalud: String,
  tipoAlimentacion: String,
  cantidadRecomendada: String,
  frecuenciaRecomendada: String,
  fechaRescate: Date,
  ubicacionRescate: String,
  detallesRescate: String,
  imagen: String,
  tipo: String,
  rescatistaId: { type: String, ref: 'Rescatista' },
  geolocalizacionId: { type: String, ref: 'Geolocalizacion' }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Animal', AnimalSchema);
