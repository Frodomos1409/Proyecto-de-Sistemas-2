const { Transfer, Evaluation, Treatment, Liberation, Adoption, Animal } = require('../../models');

exports.getHistoryDirect = async (animalId) => {
  const [
    animal,
    transfers,
    evaluations,
    treatments,
    liberations,
    adoptions
  ] = await Promise.all([
    Animal.findByPk(animalId),
    Transfer.findAll({ where: { animalId }, order: [['fechaTraslado', 'ASC']] }),
    Evaluation.findAll({ where: { animalId }, order: [['fechaEvaluacion', 'ASC']] }),
    Treatment.findAll({ where: { animalId }, order: [['fechaTratamiento', 'ASC']] }),
    Liberation.findAll({ where: { animalId }, order: [['fechaLiberacion', 'ASC']] }),
    Adoption.findAll({ where: { animalId }, order: [['fechaAdopcion', 'ASC']] })
  ]);

  return {
    animal,
    transfers,
    evaluations,
    treatments,
    liberations,
    adoptions
  };
};
