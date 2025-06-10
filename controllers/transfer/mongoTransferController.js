const TransferMongo = require('../../models/mongo/TransferMongo');
const AnimalMongo = require('../../models/mongo/AnimalMongo');
const GeolocalizacionMongo = require('../../models/mongo/GeolocalizacionMongo');
const { v4: uuidv4 } = require('uuid');

exports.createDirect = async (data, id) => {
  const {
    nombreAnimal,
    motivo,
    observaciones,
    responsable,
    fechaTraslado,
    latitudAnterior,
    longitudAnterior,
    descripcionAnterior,
    latitudNueva,
    longitudNueva,
    descripcionNueva
  } = data;

  const animal = await AnimalMongo.findOne({ nombre: nombreAnimal });
  if (!animal) throw new Error('Animal no encontrado en MongoDB');

  const anteriorId = uuidv4();
  const nuevaId = uuidv4();

  await new GeolocalizacionMongo({
    _id: anteriorId,
    latitud: latitudAnterior,
    longitud: longitudAnterior,
    descripcion: descripcionAnterior
  }).save();

  await new GeolocalizacionMongo({
    _id: nuevaId,
    latitud: latitudNueva,
    longitud: longitudNueva,
    descripcion: descripcionNueva
  }).save();

  return await new TransferMongo({
    _id: id,
    animalId: animal._id,
    motivo,
    observaciones,
    responsable,
    fechaTraslado,
    geolocalizacionAnteriorId: anteriorId,
    geolocalizacionNuevaId: nuevaId
  }).save();
};

exports.getAllDirect = async () => {
  const transfers = await TransferMongo.find().populate({
    path: 'animalId',
    select: 'nombre'
  });
  return transfers.map(t => ({
    ...t.toObject(),
    nombreAnimal: t.animalId?.nombre
  }));
};


exports.getByIdDirect = async (id) => {
  const record = await TransferMongo.findById(id).populate('animalId');
  if (!record) throw new Error('Transferencia no encontrada en MongoDB');
  return record;
};

exports.updateDirect = async (id, data) => {
  const updated = await TransferMongo.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Transferencia no encontrada');
  return { message: 'Transferencia actualizada en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await TransferMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Transferencia no encontrada');
  return { message: 'Transferencia eliminada de MongoDB' };
};

exports.getUltimaUbicacion = async (animalId) => {
  const traslado = await TransferMongo.find({ animalId }).sort({ fechaTraslado: -1 }).limit(1);
  if (!traslado.length) throw new Error('No hay traslados para este animal en MongoDB');
  return traslado[0].ubicacionNueva;
};

exports.getTracking = async (animalId) => {
  const historial = await TransferMongo.find({ animalId })
    .sort({ fechaTraslado: 1 })
    .select('ubicacionAnterior ubicacionNueva fechaTraslado responsable motivo');

  if (!historial.length) throw new Error('No hay historial de traslados para este animal en MongoDB');
  return historial;
};
