const RescatistaSQL = require('../../models/postgres/Rescatista.pg');
const GeolocalizacionSQL = require('../../models/postgres/Geolocalizacion.pg');
const AnimalSQL = require('../../models/postgres/Animal.pg'); // ✅ Agregado
const { v4: uuidv4 } = require('uuid');


exports.createDirect = async (data) => {
  const {
    nombre,
    telefono,
    fechaRescatista,
    imagen,
    latitud,
    longitud,
    descripcion
  } = data;

  const geoId = uuidv4();
  await GeolocalizacionSQL.create({
    id: geoId,
    latitud,
    longitud,
    descripcion
  });

  return await RescatistaSQL.create({
    id: data.id,
    nombre,
    telefono,
    fechaRescatista,
    imagen,
    geolocalizacionId: geoId
  });
};

exports.getAllDirect = async () => {
  return await RescatistaSQL.findAll({
    include: [{ model: AnimalSQL, as: 'animales' }]
  });
};

exports.getByIdDirect = async (id) => {
  const record = await RescatistaSQL.findByPk(id, {
    include: [{ model: AnimalSQL, as: 'animales' }]
  });
  if (!record) throw new Error('Rescatista no encontrado en PostgreSQL');
  return record;
};

exports.updateDirect = async (id, data) => {
  const [updated] = await RescatistaSQL.update(data, { where: { id } });
  if (!updated) throw new Error('Rescatista no encontrado o sin cambios');
  return { message: 'Rescatista actualizado en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await RescatistaSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Rescatista no encontrado');
  return { message: 'Rescatista eliminado en PostgreSQL' };
};
