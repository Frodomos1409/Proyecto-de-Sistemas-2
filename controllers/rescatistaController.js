const AnimalSQL = require('../models/postgres/Animal.pg');
const AnimalMongo = require('../models/mongo/AnimalMongo');
const RescatistaSQL = require('../models/postgres/Rescatista.pg');
const RescatistaMongo = require('../models/mongo/RescatistaMongo');

exports.create = async (req, res) => {
  try {
    const { rescatistaId, ...data } = req.body;

    const sql = await AnimalSQL.create({ ...data, rescatistaId });
    const mongo = await new AnimalMongo({ ...data, rescatistaId }).save();

    await RescatistaMongo.findByIdAndUpdate(rescatistaId, { $push: { animales: mongo._id } });

    res.status(201).json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const sql = await AnimalSQL.findAll();
    const mongo = await AnimalMongo.find().populate('rescatistaId');
    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = await AnimalSQL.findByPk(id);
    const mongo = await AnimalMongo.findById(id).populate('rescatistaId');
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