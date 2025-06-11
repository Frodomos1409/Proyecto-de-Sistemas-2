const TransferMongo     = require('../../models/mongo/TransferMongo');
const EvaluationMongo   = require('../../models/mongo/EvaluationMongo');
const TreatmentMongo    = require('../../models/mongo/TreatmentMongo');
const LiberationMongo   = require('../../models/mongo/LiberationMongo');
const AdoptionMongo     = require('../../models/mongo/AdoptionMongo');
const AnimalMongo       = require('../../models/mongo/AnimalMongo');

exports.getHistoryDirect = async (animalId) => {
  const [
    animal,
    transfers,
    evaluations,
    treatments,
    liberations,
    adoptions
  ] = await Promise.all([
    AnimalMongo.findById(animalId).lean(),
    TransferMongo.find({ animalId }).sort({ fechaTraslado: 1 }).lean(),
    EvaluationMongo.find({ animalId }).sort({ fechaEvaluacion: 1 }).lean(),
    TreatmentMongo.find({ animalId }).sort({ fechaTratamiento: 1 }).lean(),
    LiberationMongo.find({ animalId }).sort({ fechaLiberacion: 1 }).lean(),
    AdoptionMongo.find({ animalId }).sort({ fechaAdopcion: 1 }).lean()
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
