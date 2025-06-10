const UserSQL = require('../../models/postgres/User.pg');

exports.createDirect = async (data, id) => {
  const { firstName, lastName, username, email, password } = data;

  return await UserSQL.create({
    id,
    name: firstName,
    lastName,
    username,
    email,
    password
    
  });
};

exports.getAllDirect = async () => {
  return await UserSQL.findAll();
};

exports.getByIdDirect = async (id) => {
  const user = await UserSQL.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado en PostgreSQL');
  return user;
};

exports.updateDirect = async (id, data) => {
  const [updated] = await UserSQL.update(data, { where: { id } });
  if (!updated) throw new Error('Usuario no encontrado o sin cambios');
  return { message: 'Usuario actualizado en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await UserSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Usuario no encontrado');
  return { message: 'Usuario eliminado en PostgreSQL' };
};
