const EvaluationSQL = require('../models/postgres/Evaluation.pg');
const EvaluationMongo = require('../models/mongo/EvaluationMongo');

exports.create = async (req, res) => {
  try {
    const { animalId, ...data } = req.body;

    const sql = await EvaluationSQL.create({ ...data, animalId });
    const mongo = await new EvaluationMongo({ ...data, animalId }).save();

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
    const id = req.params.id;
    const sql = await EvaluationSQL.findByPk(id);
    const mongo = await EvaluationMongo.findById(id).populate('animalId');
    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NUEVA RUTA: Obtener evaluaciones por animalId
exports.getByAnimalId = async (req, res) => {
  try {
    const { animalId } = req.params;

    const sql = await EvaluationSQL.findAll({ where: { animalId } });
    const mongo = await EvaluationMongo.find({ animalId }).populate('animalId');

    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    await EvaluationSQL.update(req.body, { where: { id } });
    await EvaluationMongo.findByIdAndUpdate(id, req.body);
    res.json({ mensaje: 'Evaluación actualizada en ambas BD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await EvaluationSQL.destroy({ where: { id } });
    await EvaluationMongo.findByIdAndDelete(id);
    res.json({ mensaje: 'Evaluación eliminada de ambas BD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
