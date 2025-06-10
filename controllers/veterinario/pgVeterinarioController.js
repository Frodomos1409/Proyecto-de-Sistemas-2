const VeterinarioSQL = require('../../models/postgres/Veterinario.pg');

exports.createDirect = async (data, id) => {
  return await VeterinarioSQL.create({ ...data, id });
};

exports.getAllDirect = async () => {
  return await VeterinarioSQL.findAll();
};

exports.getByIdDirect = async (id) => {
  const result = await VeterinarioSQL.findByPk(id);
  if (!result) throw new Error('Veterinario no encontrado en PostgreSQL');
  return result;
};

exports.updateDirect = async (id, data) => {
  const updated = await VeterinarioSQL.update(data, { where: { id } });
  if (updated[0] === 0) throw new Error('Veterinario no encontrado o sin cambios en PostgreSQL');
  return { message: 'Veterinario actualizado en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await VeterinarioSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Veterinario no encontrado en PostgreSQL');
  return { message: 'Veterinario eliminado en PostgreSQL' };
};
