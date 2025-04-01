const RescatistaSQL = require('../models/postgres/Rescatista.pg');
const RescatistaMongo = require('../models/mongo/RescatistaMongo');

exports.create = async (req, res) => {
  try {
    const sql = await RescatistaSQL.create(req.body);
    const mongo = await new RescatistaMongo(req.body).save();
    res.status(201).json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const sql = await RescatistaSQL.findAll();
    const mongo = await RescatistaMongo.find();
    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sql = await RescatistaSQL.findByPk(req.params.id);
    const mongo = await RescatistaMongo.findById(req.params.id);
    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await RescatistaSQL.update(req.body, { where: { id: req.params.id } });
    await RescatistaMongo.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensaje: 'Rescatista actualizado en ambas BD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await RescatistaSQL.destroy({ where: { id: req.params.id } });
    await RescatistaMongo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Rescatista eliminado de ambas BD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
