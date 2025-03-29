const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    tipo: { type: String, required: true }
});

const AnimalMongo = mongoose.model('Animal', AnimalSchema);

module.exports = AnimalMongo;
