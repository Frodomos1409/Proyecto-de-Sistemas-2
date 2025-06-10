const { v4: uuidv4 } = require('uuid');
const pg = require('./pgAnimalController');
const mongo = require('./mongoAnimalController');

exports.create = async (req, res) => {
  try {
    const id = uuidv4();
    const rescatistaId = uuidv4(); // ID compartido para el rescatista
    const imagen = req.file ? req.file.filename : null;
    const data = { ...req.body, imagen };

    const pgResult = await pg.createDirect(data, id, rescatistaId);
    const mongoResult = await mongo.createDirect(data, id, rescatistaId);

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

exports.getStats = async (req, res) => {
  try {
    const pgResult = await pg.getStatsByEspecieAndEstado();
    const mongoResult = await mongo.getStatsByEspecieAndEstado();
    res.json({ postgres: pgResult, mongo: mongoResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
