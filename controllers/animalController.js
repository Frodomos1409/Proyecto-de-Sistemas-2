const AnimalSQL = require('../models/postgres/Animal.pg');
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
        const id = req.params.id;

        const sql = await AnimalSQL.findByPk(id);
        const mongo = await AnimalMongo.findById(id);

        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        await AnimalSQL.update(req.body, { where: { id } });
        await AnimalMongo.findByIdAndUpdate(id, req.body);

        res.json({ mensaje: 'Animal actualizado en ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await AnimalSQL.destroy({ where: { id } });
        await AnimalMongo.findByIdAndDelete(id);

        res.json({ mensaje: 'Animal eliminado de ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
