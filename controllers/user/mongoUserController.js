const UserMongo = require('../../models/mongo/UserMongo');

exports.createDirect = async (data, id) => {
  const { firstName, lastName, username, email, password } = data;

  return await new UserMongo({
    _id: id,
    firstName,
    lastName,
    username,
    email,
    password
  }).save();
};

exports.getAllDirect = async () => {
  return await UserMongo.find();
};

exports.getByIdDirect = async (id) => {
  const user = await UserMongo.findById(id);
  if (!user) throw new Error('Usuario no encontrado en MongoDB');
  return user;
};

exports.updateDirect = async (id, data) => {
  const updated = await UserMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Usuario no encontrado');
  return { message: 'Usuario actualizado en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await UserMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Usuario no encontrado');
  return { message: 'Usuario eliminado en MongoDB' };
};
