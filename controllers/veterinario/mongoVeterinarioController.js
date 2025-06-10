const VeterinarioMongo = require('../../models/mongo/VeterinarioMongo');

exports.createDirect = async (data, id) => {
  return await new VeterinarioMongo({ _id: id, ...data }).save();
};

exports.getAllDirect = async () => {
  return await VeterinarioMongo.find();
};

exports.getByIdDirect = async (id) => {
  const result = await VeterinarioMongo.findById(id);
  if (!result) throw new Error('Veterinario no encontrado en MongoDB');
  return result;
};

exports.updateDirect = async (id, data) => {
  const updated = await VeterinarioMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Veterinario no encontrado en MongoDB');
  return { message: 'Veterinario actualizado en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await VeterinarioMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Veterinario no encontrado en MongoDB');
  return { message: 'Veterinario eliminado en MongoDB' };
};
