const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  animalId: { type: String, ref: 'Animal', required: true },
  tratamiento: { type: String, required: true },
  duracion: String,
  observaciones: String,
  responsableId: { type: String, ref: 'Veterinario' }, // ✅ cambiado
  fechaTratamiento: { type: Date, default: Date.now }
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Treatment', TreatmentSchema);
