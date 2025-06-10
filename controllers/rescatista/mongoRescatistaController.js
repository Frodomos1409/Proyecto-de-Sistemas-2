const RescatistaMongo = require('../../models/mongo/RescatistaMongo');
const GeolocalizacionMongo = require('../../models/mongo/GeolocalizacionMongo');
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
  await new GeolocalizacionMongo({
    _id: geoId,
    latitud,
    longitud,
    descripcion
  }).save();

  return await new RescatistaMongo({
    _id: data._id,
    nombre,
    telefono,
    fechaRescatista,
    imagen,
    geolocalizacionId: geoId
  }).save();
};

exports.getAllDirect = async () => {
  return await RescatistaMongo.find().populate('animales');
};

exports.getByIdDirect = async (id) => {
  const record = await RescatistaMongo.findById(id).populate('animales');
  if (!record) throw new Error('Rescatista no encontrado en MongoDB');
  return record;
};

exports.updateDirect = async (id, data) => {
  const updated = await RescatistaMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Rescatista no encontrado');
  return { message: 'Rescatista actualizado en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await RescatistaMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Rescatista no encontrado');
  return { message: 'Rescatista eliminado en MongoDB' };
};
