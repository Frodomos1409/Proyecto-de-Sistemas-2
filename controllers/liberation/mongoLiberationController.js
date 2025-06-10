const LiberationMongo = require('../../models/mongo/LiberationMongo');
const AnimalMongo = require('../../models/mongo/AnimalMongo');
const GeolocalizacionMongo = require('../../models/mongo/GeolocalizacionMongo');
const { v4: uuidv4 } = require('uuid');

exports.createDirect = async (data, id) => {
  const { nombreAnimal, fechaLiberacion, observaciones, latitud, longitud, descripcion } = data;

  const animal = await AnimalMongo.findOne({ nombre: nombreAnimal });
  if (!animal) throw new Error('Animal no encontrado en MongoDB');

  const geoId = uuidv4();
  await new GeolocalizacionMongo({
    _id: geoId,
    latitud,
    longitud,
    descripcion
  }).save();

  const liberacion = await new LiberationMongo({
    _id: id,
    fechaLiberacion,
    observaciones,
    animalId: animal._id,
    geolocalizacionId: geoId
  }).save();

  await AnimalMongo.findByIdAndUpdate(animal._id, {
    fechaLiberacion,
    ubicacionLiberacion: descripcion
  });

  return liberacion;
};


exports.getAllDirect = async () => {
  const liberations = await LiberationMongo.find().populate({
    path: 'animalId',
    select: 'nombre'
  });
  return liberations.map(l => ({
    ...l.toObject(),
    nombreAnimal: l.animalId?.nombre
  }));
};


exports.getByIdDirect = async (id) => {
  return await LiberationMongo.findById(id).populate('animalId');
};

exports.updateDirect = async (id, data) => {
  const updated = await LiberationMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Liberación no encontrada');
  return { message: 'Liberación actualizada en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await LiberationMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Liberación no encontrada');
  return { message: 'Liberación eliminada de MongoDB' };
};
