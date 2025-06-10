const AnimalMongo = require('../../models/mongo/AnimalMongo');
const LiberationMongo = require('../../models/mongo/LiberationMongo');
const EvaluationMongo = require('../../models/mongo/EvaluationMongo');
const TransferMongo = require('../../models/mongo/TransferMongo');

// Por especie
exports.getBySpecies = async () => {
  const animals = await AnimalMongo.find();
  const result = {};
  animals.forEach(({ especie }) => {
    if (especie) result[especie] = (result[especie] || 0) + 1;
  });
  return result;
};

// Por tipo
exports.getByType = async () => {
  const animals = await AnimalMongo.find();
  const result = {};
  animals.forEach(({ tipo }) => {
    if (tipo) result[tipo] = (result[tipo] || 0) + 1;
  });
  return result;
};

// Liberaciones por mes
exports.getLiberationsPerMonth = async () => {
  const liberations = await LiberationMongo.find();
  const result = {};
  liberations.forEach(({ fechaLiberacion }) => {
    const key = new Date(fechaLiberacion).toISOString().slice(0, 7);
    result[key] = (result[key] || 0) + 1;
  });
  return result;
};

// Evaluaciones por animal
exports.getEvaluationsPerAnimal = async () => {
  const evaluations = await EvaluationMongo.find().populate('animalId');
  const result = {};
  evaluations.forEach(({ animalId }) => {
    const name = animalId?.nombre;
    if (name) result[name] = (result[name] || 0) + 1;
  });
  return result;
};

// Traslados por animal
exports.getTransfersPerAnimal = async () => {
  const transfers = await TransferMongo.find().populate('animalId');
  const result = {};
  transfers.forEach(({ animalId }) => {
    const name = animalId?.nombre;
    if (name) result[name] = (result[name] || 0) + 1;
  });
  return result;
};
