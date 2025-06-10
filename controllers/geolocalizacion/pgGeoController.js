const GeolocalizacionSQL = require('../../models/postgres/Geolocalizacion.pg');

exports.createDirect = async (data, id) => {
  return await GeolocalizacionSQL.create({ ...data, id });
};

exports.getAllDirect = async () => {
  return await GeolocalizacionSQL.findAll();
};

exports.getByIdDirect = async (id) => {
  const result = await GeolocalizacionSQL.findByPk(id);
  if (!result) throw new Error('No encontrada en PostgreSQL');
  return result;
};

exports.updateDirect = async (id, data) => {
  const updated = await GeolocalizacionSQL.update(data, { where: { id } });
  if (!updated[0]) throw new Error('No encontrada para actualizar');
  return { message: 'Actualizada en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await GeolocalizacionSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('No encontrada para eliminar');
  return { message: 'Eliminada de PostgreSQL' };
};
