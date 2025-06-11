const pgHist = require('./pgHistoricoController');
const mongoHist = require('./mongoHistoricoController');

const AnimalSQL = require('../../models/postgres/Animal.pg');
const RescatistaSQL = require('../../models/postgres/Rescatista.pg');
const AnimalMongo = require('../../models/mongo/AnimalMongo');
const RescatistaMongo = require('../../models/mongo/RescatistaMongo');

const { Op, fn, col } = require('sequelize');

exports.getByNombre = async (req, res) => {
  try {
    const { nombreAnimal } = req.params;

    // Buscar en Postgres (sin importar mayúsculas)
    const animalPostgres = await AnimalSQL.findOne({
      where: {
        nombre: {
          [Op.iLike]: nombreAnimal // case-insensitive
        }
      }
    });

    // Buscar en MongoDB (también insensible a mayúsculas)
    const animalMongo = await AnimalMongo.findOne({
      nombre: new RegExp(`^${nombreAnimal}$`, 'i')
    });

    if (!animalPostgres && !animalMongo) {
      return res.status(404).json({ error: 'Animal no encontrado en ninguna base de datos' });
    }

    // Obtener IDs
    const animalId = animalPostgres?.id || animalMongo?._id;

    // Obtener historial
    const [postgresHistory, mongoHistory] = await Promise.all([
      pgHist.getHistoryDirect(animalId),
      mongoHist.getHistoryDirect(animalId)
    ]);

    // Buscar datos del rescatista
    const rescatistaPostgres = animalPostgres
      ? await RescatistaSQL.findByPk(animalPostgres.rescatista_id)
      : null;

    const rescatistaMongo = animalMongo
      ? await RescatistaMongo.findById(animalMongo.rescatistaId).lean()
      : null;

    res.json({
      success: true,
      id: animalId,
      postgres: {
        animal: animalPostgres,
        rescatista: rescatistaPostgres,
        ...postgresHistory
      },
      mongo: {
        animal: animalMongo,
        rescatista: rescatistaMongo,
        ...mongoHistory
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const { animalId } = req.params;

    const [postgresHistory, mongoHistory] = await Promise.all([
      require('./pgHistoricoController').getHistoryDirect(animalId),
      require('./mongoHistoricoController').getHistoryDirect(animalId)
    ]);

    res.json({
      success: true,
      id: animalId,
      postgres: postgresHistory,
      mongo: mongoHistory
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
