const mongoose = require('mongoose');

const VeterinarioSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // UUID
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  especialidad: { type: String },
  email: { type: String, unique: true },
  imagen: { type: String }

}, { _id: false, timestamps: true });

module.exports = mongoose.model('Veterinario', VeterinarioSchema);
