const AdoptionSQL = require('../models/postgres/Adoption.pg');
const AdoptionMongo = require('../models/mongo/AdoptionMongo');

exports.create = async (req, res) => {
    try {
        const sql = await AdoptionSQL.create(req.body);
        const mongo = await new AdoptionMongo(req.body).save();
        res.status(201).json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const sql = await AdoptionSQL.findAll();
        const mongo = await AdoptionMongo.find().populate('animalId');
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const sql = await AdoptionSQL.findByPk(req.params.id);
        const mongo = await AdoptionMongo.findById(req.params.id).populate('animalId');
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await AdoptionSQL.update(req.body, { where: { id: req.params.id } });
        await AdoptionMongo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Adopción actualizada en ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await AdoptionSQL.destroy({ where: { id: req.params.id } });
        await AdoptionMongo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Adopción eliminada de ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
