const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  animalId: { type: String, ref: 'Animal', required: true },
  diagnostico: { type: String, required: true },
  sintomas: String,
  medicacion: String,
  responsableId: { type: String, ref: 'Veterinario' }, // ✅ cambiado
  fechaEvaluacion: { type: Date, default: Date.now },
  proximaRevision: Date
}, { _id: false, timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);
