const AdoptionMongo = require('../../models/mongo/AdoptionMongo');
const AnimalMongo = require('../../models/mongo/AnimalMongo');
const GeolocalizacionMongo = require('../../models/mongo/GeolocalizacionMongo');
const { v4: uuidv4 } = require('uuid');

exports.createDirect = async (data, id) => {
  const {
    nombreAnimal,
    latitud,
    longitud,
    descripcion,
    ...datos
  } = data;

  const animal = await AnimalMongo.findOne({ nombre: nombreAnimal });
  if (!animal) throw new Error('Animal no encontrado en MongoDB');
  if (animal.tipo !== 'Doméstico') throw new Error('Solo se pueden adoptar animales de tipo "Doméstico"');

  const geoId = uuidv4();
  await new GeolocalizacionMongo({
    _id: geoId,
    latitud,
    longitud,
    descripcion
  }).save();

  return await new AdoptionMongo({
    _id: id,
    ...datos,
    animalId: animal._id,
    geolocalizacionId: geoId
  }).save();
};


exports.getAllDirect = async () => {
  const adoptions = await AdoptionMongo.find().populate({
    path: 'animalId',
    select: 'nombre'
  });
  return adoptions.map(a => ({
    ...a.toObject(),
    nombreAnimal: a.animalId?.nombre
  }));
};


exports.getByIdDirect = async (id) => {
  const record = await AdoptionMongo.findById(id).populate('animalId');
  if (!record) throw new Error('Adopción no encontrada en MongoDB');
  return record;
};

exports.updateDirect = async (id, data) => {
  const updated = await AdoptionMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Adopción no encontrada en MongoDB');
  return { message: 'Adopción actualizada en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await AdoptionMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Adopción no encontrada en MongoDB');
  return { message: 'Adopción eliminada en MongoDB' };
};
