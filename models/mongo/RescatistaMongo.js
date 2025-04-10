const mongoose = require('mongoose');
const RescatistaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  fechaRescate: { type: Date, required: true },
  ubicacionRescate: { type: String, required: true },
  animales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AnimalMongo' }]
}, { timestamps: true });

module.exports = mongoose.model('RescatistaMongo', RescatistaSchema);
