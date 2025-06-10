const GeolocalizacionMongo = require('../../models/mongo/GeolocalizacionMongo');

exports.createDirect = async (data, id) => {
  return await new GeolocalizacionMongo({ _id: id, ...data }).save();
};

exports.getAllDirect = async () => {
  return await GeolocalizacionMongo.find();
};

exports.getByIdDirect = async (id) => {
  const result = await GeolocalizacionMongo.findById(id);
  if (!result) throw new Error('No encontrada en MongoDB');
  return result;
};

exports.updateDirect = async (id, data) => {
  const result = await GeolocalizacionMongo.findByIdAndUpdate(id, data, { new: true });
  if (!result) throw new Error('No encontrada para actualizar');
  return result;
};

exports.deleteDirect = async (id) => {
  const result = await GeolocalizacionMongo.findByIdAndDelete(id);
  if (!result) throw new Error('No encontrada para eliminar');
  return { message: 'Eliminada de MongoDB' };
};
