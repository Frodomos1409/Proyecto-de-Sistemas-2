const LiberationSQL = require('../../models/postgres/Liberation.pg');
const AnimalSQL = require('../../models/postgres/Animal.pg');
const GeolocalizacionSQL = require('../../models/postgres/Geolocalizacion.pg');
const { v4: uuidv4 } = require('uuid');

exports.createDirect = async (data, id) => {
  const { nombreAnimal, fechaLiberacion, observaciones, latitud, longitud, descripcion } = data;

  const animal = await AnimalSQL.findOne({ where: { nombre: nombreAnimal } });
  if (!animal) throw new Error('Animal no encontrado en PostgreSQL');

  const geoId = uuidv4();
  await GeolocalizacionSQL.create({
    id: geoId,
    latitud,
    longitud,
    descripcion
  });

  const liberacion = await LiberationSQL.create({
    id,
    fechaLiberacion,
    observaciones,
    animalId: animal.id,
    geolocalizacionId: geoId
  });

  await AnimalSQL.update(
    { fechaLiberacion, ubicacionLiberacion: descripcion },
    { where: { id: animal.id } }
  );

  return liberacion;
};


exports.getAllDirect = async () => {
  return await LiberationSQL.findAll({
    include: [{ model: AnimalSQL, as: 'animal', attributes: ['nombre'] }]
  });
};


exports.getByIdDirect = async (id) => {
  return await LiberationSQL.findByPk(id);
};

exports.updateDirect = async (id, data) => {
  const updated = await LiberationSQL.update(data, { where: { id } });
  if (!updated[0]) throw new Error('Liberación no encontrada');
  return { message: 'Liberación actualizada en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await LiberationSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Liberación no encontrada');
  return { message: 'Liberación eliminada de PostgreSQL' };
};
