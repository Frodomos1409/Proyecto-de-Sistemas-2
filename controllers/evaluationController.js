const EvaluationSQL = require('../models/postgres/Evaluation.pg');
const EvaluationMongo = require('../models/mongo/EvaluationMongo');
const AnimalSQL = require('../models/postgres/Animal.pg');
const AnimalMongo = require('../models/mongo/AnimalMongo');


exports.create = async (req, res) => {
  try {
    const { nombreAnimal, ...datos } = req.body;

    if (!nombreAnimal) {
      return res.status(400).json({ error: 'Debe incluir el campo "nombreAnimal"' });
    }

    const animalSQL = await AnimalSQL.findOne({ where: { nombre: nombreAnimal } });
    const animalMongo = await AnimalMongo.findOne({ nombre: nombreAnimal });

    if (!animalSQL || !animalMongo) {
      return res.status(404).json({ error: 'Animal no encontrado en una o ambas BD' });
    }

    const evaluacionSQL = await EvaluationSQL.create({
      ...datos,
      animalId: animalSQL.id
    });

    const evaluacionMongo = await new EvaluationMongo({
      ...datos,
      animalId: animalMongo._id
    }).save();

    res.status(201).json({ evaluacionSQL, evaluacionMongo });
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
