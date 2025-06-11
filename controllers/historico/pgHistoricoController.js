// controllers/historico/pgHistoricoController.js
const { Transfer, Evaluation, Treatment, Liberation, Adoption } = require('../../models');

exports.getHistoryDirect = async (animalId) => {
  const [transfers, evaluations, treatments, liberations, adoptions] =
    await Promise.all([
      Transfer.findAll({ where: { animalId }, order: [['fechaTraslado', 'ASC']] }),
      Evaluation.findAll({ where: { animalId }, order: [['fechaEvaluacion', 'ASC']] }),
      Treatment.findAll({ where: { animalId }, order: [['fechaTratamiento', 'ASC']] }),
      Liberation.findAll({ where: { animalId }, order: [['fechaLiberacion', 'ASC']] }),
      Adoption.findAll({ where: { animalId }, order: [['fechaAdopcion', 'ASC']] })
    ]);

  return { transfers, evaluations, treatments, liberations, adoptions };
};
