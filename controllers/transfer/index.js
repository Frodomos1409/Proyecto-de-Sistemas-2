const { v4: uuidv4 } = require('uuid');
const pg = require('./pgTransferController');
const mongo = require('./mongoTransferController');

exports.create = async (req, res) => {
  try {
    const id = uuidv4();
    const pgResult = await pg.createDirect(req.body, id);
    const mongoResult = await mongo.createDirect(req.body, id);
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
    const pgResult = await pg.updateDirect(req.params.id, req.body);
    const mongoResult = await mongo.updateDirect(req.params.id, req.body);
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

exports.getUltimaUbicacion = async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const pgResult = await pg.getUltimaUbicacion(animalId);
    const mongoResult = await mongo.getUltimaUbicacion(animalId);
    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTracking = async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const pgResult = await pg.getTracking(animalId);
    const mongoResult = await mongo.getTracking(animalId);
    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
