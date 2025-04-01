const EvaluationSQL = require('../models/postgres/Evaluation.pg');
const EvaluationMongo = require('../models/mongo/EvaluationMongo');

exports.create = async (req, res) => {
    try {
        const sql = await EvaluationSQL.create(req.body);
        const mongo = await new EvaluationMongo(req.body).save();
        res.status(201).json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const sql = await EvaluationSQL.findAll();
        const mongo = await EvaluationMongo.find().populate('animalId');
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const sql = await EvaluationSQL.findByPk(req.params.id);
        const mongo = await EvaluationMongo.findById(req.params.id).populate('animalId');
        res.json({ sql, mongo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await EvaluationSQL.update(req.body, { where: { id: req.params.id } });
        await EvaluationMongo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Evaluación actualizada en ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await EvaluationSQL.destroy({ where: { id: req.params.id } });
        await EvaluationMongo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Evaluación eliminada de ambas BD' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
