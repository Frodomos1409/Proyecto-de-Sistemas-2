const { v4: uuidv4 } = require('uuid');
const pg = require('../rescatista/pgRescatistaController');
const mongo = require('../rescatista/mongoRescatistaController');

exports.create = async (req, res) => {
  try {
    const id = uuidv4();
    const imagen = req.file ? req.file.filename : null;
    const data = { ...req.body, imagen };

    const pgResult = await pg.createDirect({ ...data, id });
    const mongoResult = await mongo.createDirect({ ...data, _id: id });

    res.status(201).json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAll = async (req, res) => {
  try {
    const pgResult = await pg.getAllDirect();
    const mongoResult = await mongo.getAllDirect();
    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pgResult = await pg.getByIdDirect(req.params.id);
    const mongoResult = await mongo.getByIdDirect(req.params.id);
    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    const imagen = req.file ? req.file.filename : null;
    const data = imagen ? { ...req.body, imagen } : req.body;

    const pgResult = await pg.updateDirect(req.params.id, data);
    const mongoResult = await mongo.updateDirect(req.params.id, data);

    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const pgResult = await pg.deleteDirect(req.params.id);
    const mongoResult = await mongo.deleteDirect(req.params.id);
    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
