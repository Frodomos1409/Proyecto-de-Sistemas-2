const TransferSQL = require('../../models/postgres/Transfer.pg');
const AnimalSQL = require('../../models/postgres/Animal.pg');
const GeolocalizacionSQL = require('../../models/postgres/Geolocalizacion.pg');
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

  const animal = await AnimalSQL.findOne({ where: { nombre: nombreAnimal } });
  if (!animal) throw new Error('Animal no encontrado en PostgreSQL');

  const anteriorId = uuidv4();
  const nuevaId = uuidv4();

  await GeolocalizacionSQL.create({
    id: anteriorId,
    latitud: latitudAnterior,
    longitud: longitudAnterior,
    descripcion: descripcionAnterior
  });

  await GeolocalizacionSQL.create({
    id: nuevaId,
    latitud: latitudNueva,
    longitud: longitudNueva,
    descripcion: descripcionNueva
  });

  return await TransferSQL.create({
    id,
    animalId: animal.id,
    motivo,
    observaciones,
    responsable,
    fechaTraslado,
    geolocalizacionAnteriorId: anteriorId,
    geolocalizacionNuevaId: nuevaId
  });
};

exports.getAllDirect = async () => {
  return await TransferSQL.findAll({
    include: [{ model: AnimalSQL, as: 'animal', attributes: ['nombre'] }]
  });
};


exports.getByIdDirect = async (id) => {
  const record = await TransferSQL.findByPk(id);
  if (!record) throw new Error('Transferencia no encontrada en PostgreSQL');
  return record;
};

exports.updateDirect = async (id, data) => {
  const [updated] = await TransferSQL.update(data, { where: { id } });
  if (!updated) throw new Error('Transferencia no encontrada o sin cambios');
  return { message: 'Transferencia actualizada en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await TransferSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Transferencia no encontrada');
  return { message: 'Transferencia eliminada de PostgreSQL' };
};

exports.getUltimaUbicacion = async (animalId) => {
  const traslado = await TransferSQL.findOne({
    where: { animalId },
    order: [['fechaTraslado', 'DESC']]
  });
  if (!traslado) throw new Error('No hay traslados para este animal en PostgreSQL');
  return traslado.ubicacionNueva;
};

exports.getTracking = async (animalId) => {
  const historial = await TransferSQL.findAll({
    where: { animalId },
    order: [['fechaTraslado', 'ASC']],
    attributes: ['ubicacionAnterior', 'ubicacionNueva', 'fechaTraslado', 'responsable', 'motivo']
  });

  if (!historial.length) throw new Error('No hay historial de traslados para este animal en PostgreSQL');
  return historial;
};
