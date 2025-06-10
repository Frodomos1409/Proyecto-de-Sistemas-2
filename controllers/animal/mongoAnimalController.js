const AnimalMongo = require('../../models/mongo/AnimalMongo');
const RescatistaMongo = require('../../models/mongo/RescatistaMongo');
const GeolocalizacionMongo = require('../../models/mongo/GeolocalizacionMongo');
const { v4: uuidv4 } = require('uuid');

exports.createDirect = async (data, id, rescatistaId) => {
  const {
    nombreRescatista,
    telefonoRescatista,
    fechaRescate,
    detallesRescate,
    latitud,
    longitud,
    descripcion,
    ...datosAnimal
  } = data;

  let rescatista = await RescatistaMongo.findOne({
    nombre: nombreRescatista,
    telefono: telefonoRescatista
  });

  if (!rescatista) {
    rescatista = await new RescatistaMongo({
      _id: rescatistaId,
      nombre: nombreRescatista,
      telefono: telefonoRescatista,
      fechaRescatista,
      animales: []
    }).save();
  }

  const geolocalizacionId = uuidv4();
  await new GeolocalizacionMongo({
    _id: geolocalizacionId,
    latitud,
    longitud,
    descripcion
  }).save();

  const animal = await new AnimalMongo({
    _id: id,
    ...datosAnimal,
    detallesRescate,
    fechaRescate,
    ubicacionRescate: descripcion,
    rescatistaId: rescatista._id,
    geolocalizacionId
  }).save();

  await RescatistaMongo.findByIdAndUpdate(rescatista._id, {
    $addToSet: { animales: id }
  });

  return { animal, rescatista };
};

exports.getAllDirect = async () => {
  const animals = await AnimalMongo.find()
    .populate('rescatistaId')
    .populate('geolocalizacionId');

  return animals;
};

exports.getByIdDirect = async (id) => {
  const record = await AnimalMongo.findById(id)
    .populate('rescatistaId')
    .populate('geolocalizacionId');

  if (!record) throw new Error('Animal no encontrado');
  return record;
};

exports.updateDirect = async (id, data) => {
  const updated = await AnimalMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Animal no encontrado');
  return updated;
};

exports.deleteDirect = async (id) => {
  const deleted = await AnimalMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Animal no encontrado');
  return { message: 'Animal eliminado de MongoDB' };
};

exports.getStatsByEspecieAndEstado = async () => {
  const animals = await AnimalMongo.find();
  const result = {};
  animals.forEach(({ especie, estadoSalud }) => {
    if (!result[especie]) result[especie] = {};
    result[especie][estadoSalud] = (result[especie][estadoSalud] || 0) + 1;
  });
  return result;
};
