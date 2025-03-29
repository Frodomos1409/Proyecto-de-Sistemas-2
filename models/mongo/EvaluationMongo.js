const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    veterinarian: { type: String, required: true },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);