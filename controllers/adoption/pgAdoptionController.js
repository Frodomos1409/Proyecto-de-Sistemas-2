const AdoptionSQL = require('../../models/postgres/Adoption.pg');
const AnimalSQL = require('../../models/postgres/Animal.pg');
const GeolocalizacionSQL = require('../../models/postgres/Geolocalizacion.pg');
const { v4: uuidv4 } = require('uuid');

exports.createDirect = async (data, id) => {
  const {
    nombreAnimal,
    latitud,
    longitud,
    descripcion,
    ...datos
  } = data;

  const animal = await AnimalSQL.findOne({ where: { nombre: nombreAnimal } });
  if (!animal) throw new Error('Animal no encontrado en PostgreSQL');
  if (animal.tipo !== 'Doméstico') throw new Error('Solo se pueden adoptar animales de tipo "Doméstico"');

  const geoId = uuidv4();
  await GeolocalizacionSQL.create({
    id: geoId,
    latitud,
    longitud,
    descripcion
  });

  return await AdoptionSQL.create({
    id,
    ...datos,
    animalId: animal.id,
    geolocalizacionId: geoId
  });
};


exports.getAllDirect = async () => {
  return await AdoptionSQL.findAll({
    include: [{ model: AnimalSQL, as: 'animal', attributes: ['nombre'] }]
  });
};



exports.getByIdDirect = async (id) => {
  const record = await AdoptionSQL.findByPk(id);
  if (!record) throw new Error('Adopción no encontrada en PostgreSQL');
  return record;
};

exports.updateDirect = async (id, data) => {
  const updated = await AdoptionSQL.update(data, { where: { id } });
  if (updated[0] === 0) throw new Error('Adopción no encontrada o sin cambios en PostgreSQL');
  return { message: 'Adopción actualizada en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await AdoptionSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Adopción no encontrada en PostgreSQL');
  return { message: 'Adopción eliminada en PostgreSQL' };
};
