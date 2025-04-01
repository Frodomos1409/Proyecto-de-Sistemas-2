const TransferSQL = require('../models/postgres/Transfer.pg');
const TransferMongo = require('../models/mongo/TransferMongo');

exports.create = async (req, res) => {
    try {
        const sql = await TransferSQL.create(req.body);
        const mongo = await new TransferMongo(req.body).save();
        res.status(201).json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const sql = await TransferSQL.findAll();
        const mongo = await TransferMongo.find().populate('animalId');
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const sql = await TransferSQL.findByPk(req.params.id);
        const mongo = await TransferMongo.findById(req.params.id).populate('animalId');
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await TransferSQL.update(req.body, { where: { id: req.params.id } });
        await TransferMongo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Transferencia actualizada en ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await TransferSQL.destroy({ where: { id: req.params.id } });
        await TransferMongo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Transferencia eliminada de ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
