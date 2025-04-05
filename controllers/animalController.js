const AnimalSQL = require('../models/postgres/Animal.pg');
const AnimalMongo = require('../models/mongo/AnimalMongo');
const RescatistaSQL = require('../models/postgres/Rescatista.pg');
const RescatistaMongo = require('../models/mongo/RescatistaMongo');

exports.create = async (req, res) => {
  try {
    const { nombreRescatista, ...datosAnimal } = req.body;

    // Buscar rescatista por nombre en ambas BD
    const rescatistaSQL = await RescatistaSQL.findOne({ where: { nombre: nombreRescatista } });
    const rescatistaMongo = await RescatistaMongo.findOne({ nombre: nombreRescatista });

    if (!rescatistaSQL || !rescatistaMongo) {
      return res.status(404).json({ error: 'Rescatista no encontrado en una o ambas bases de datos' });
    }

    // Registrar Animal en Mongo
    const animalMongo = await new AnimalMongo({
      ...datosAnimal,
      rescatistaId: rescatistaMongo._id
    }).save();

    // Agregar ID del animal al rescatista en Mongo
    rescatistaMongo.animales.push(animalMongo._id);
    await rescatistaMongo.save();

    // Registrar Animal en SQL
    const animalSQL = await AnimalSQL.create({
      ...datosAnimal,
      // Puedes guardar el nombre del rescatista o en un futuro hacer relación FK si se desea
    });

    res.status(201).json({ mongo: animalMongo, sql: animalSQL });
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