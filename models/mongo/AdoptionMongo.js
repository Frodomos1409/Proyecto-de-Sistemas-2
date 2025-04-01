const mongoose = require('mongoose');
const AdoptionSchema = new mongoose.Schema({
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    estado: { type: String },
    nombreAdoptante: { type: String },
    contactoAdoptante: { type: String },
    direccionAdoptante: { type: String },
    observaciones: { type: String },
    fechaAdopcion: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Adoption', AdoptionSchema);