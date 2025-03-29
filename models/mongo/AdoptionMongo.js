const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    adopterName: { type: String, required: true },
    adopterContact: { type: String, required: true },
    adoptionDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);
