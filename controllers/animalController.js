const AnimalSQL = require('../models/mysql/Animal');
const AnimalMongo = require('../models/mongo/AnimalMongo');

exports.create = async (req, res) => {
    try {
        const sql = await AnimalSQL.create(req.body);
        const mongo = await new AnimalMongo(req.body).save();
        res.status(201).json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const sql = await AnimalSQL.findAll();
        const mongo = await AnimalMongo.find();
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const sql = await AnimalSQL.findByPk(req.params.id);
        const mongo = await AnimalMongo.findById(req.params.id);
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await AnimalSQL.update(req.body, { where: { id: req.params.id } });
        await AnimalMongo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Animal actualizado en ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await AnimalSQL.destroy({ where: { id: req.params.id } });
        await AnimalMongo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Animal eliminado de ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};