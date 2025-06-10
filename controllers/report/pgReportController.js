const { fn, col } = require('sequelize');
const AnimalSQL = require('../../models/postgres/Animal.pg');
const LiberationSQL = require('../../models/postgres/Liberation.pg');
const EvaluationSQL = require('../../models/postgres/Evaluation.pg');
const TransferSQL = require('../../models/postgres/Transfer.pg');

// Por especie
exports.getBySpecies = async () => {
  const animals = await AnimalSQL.findAll({ attributes: ['especie'], raw: true });
  const result = {};
  animals.forEach(({ especie }) => {
    if (especie) result[especie] = (result[especie] || 0) + 1;
  });
  return result;
};

// Por tipo
exports.getByType = async () => {
  const animals = await AnimalSQL.findAll({ attributes: ['tipo'], raw: true });
  const result = {};
  animals.forEach(({ tipo }) => {
    if (tipo) result[tipo] = (result[tipo] || 0) + 1;
  });
  return result;
};

// Liberaciones por mes
exports.getLiberationsPerMonth = async () => {
  const liberations = await LiberationSQL.findAll({ attributes: ['fechaLiberacion'], raw: true });
  const result = {};
  liberations.forEach(({ fechaLiberacion }) => {
    const key = new Date(fechaLiberacion).toISOString().slice(0, 7);
    result[key] = (result[key] || 0) + 1;
  });
  return result;
};

// Evaluaciones por animal
exports.getEvaluationsPerAnimal = async () => {
  const evaluations = await EvaluationSQL.findAll({
    include: [{ model: AnimalSQL, as: 'animal', attributes: ['nombre'] }]
  });

  const result = {};
  evaluations.forEach(({ animal }) => {
    const name = animal?.nombre;
    if (name) result[name] = (result[name] || 0) + 1;
  });

  return result;
};

// Traslados por animal
exports.getTransfersPerAnimal = async () => {
  const transfers = await TransferSQL.findAll({
    include: [{ model: AnimalSQL, as: 'animal', attributes: ['nombre'] }]
  });

  const result = {};
  transfers.forEach(({ animal }) => {
    const name = animal?.nombre;
    if (name) result[name] = (result[name] || 0) + 1;
  });

  return result;
};
