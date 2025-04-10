const mongoose = require('mongoose');
const TransferSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
  ubicacionAnterior: { type: String },
  ubicacionNueva: { type: String },
  motivo: { type: String },
  observaciones: { type: String },
  responsable: { type: String }, // ✅ NUEVO CAMPO
  fechaTraslado: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transfer', TransferSchema);
