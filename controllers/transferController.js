const TransferSQL = require('../models/postgres/Transfer.pg');
const TransferMongo = require('../models/mongo/TransferMongo');
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

    const transferSQL = await TransferSQL.create({
      ...datos,
      animalId: animalSQL.id
    });

    const transferMongo = await new TransferMongo({
      ...datos,
      animalId: animalMongo._id
    }).save();

    res.status(201).json({ transferSQL, transferMongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Implementar las funciones faltantes
exports.getAll = async (req, res) => {
  try {
    const sql = await TransferSQL.findAll();
    const mongo = await TransferMongo.find();
    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = await TransferSQL.findByPk(id);
    const mongo = await TransferMongo.findById(id);
    res.json({ sql, mongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    await TransferSQL.update(req.body, { where: { id } });
    await TransferMongo.findByIdAndUpdate(id, req.body);
    res.json({ mensaje: 'Transferencia actualizada en ambas BD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await TransferSQL.destroy({ where: { id } });
    await TransferMongo.findByIdAndDelete(id);
    res.json({ mensaje: 'Transferencia eliminada de ambas BD' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
