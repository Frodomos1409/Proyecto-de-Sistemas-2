const AnimalSQL = require('../../models/postgres/Animal.pg');
const RescatistaSQL = require('../../models/postgres/Rescatista.pg');
const GeolocalizacionSQL = require('../../models/postgres/Geolocalizacion.pg');
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

  let rescatista = await RescatistaSQL.findOne({
    where: { nombre: nombreRescatista, telefono: telefonoRescatista }
  });

  if (!rescatista) {
    rescatista = await RescatistaSQL.create({
      id: rescatistaId,
      nombre: nombreRescatista,
      telefono: telefonoRescatista,
      fechaRescatista: fechaRescate
    });
  }

  const geolocalizacionId = uuidv4();
  await GeolocalizacionSQL.create({
    id: geolocalizacionId,
    latitud,
    longitud,
    descripcion
  });

  const animal = await AnimalSQL.create({
    id,
    ...datosAnimal,
    detallesRescate,
    fechaRescate,
    ubicacionRescate: descripcion,
    rescatista_id: rescatista.id,
    geolocalizacion_id: geolocalizacionId
  });

  return { animal, rescatista };
};

exports.getAllDirect = async () => {
  return await AnimalSQL.findAll({
    include: [
      { model: RescatistaSQL, as: 'rescatista' },
      { model: GeolocalizacionSQL, as: 'geolocalizacion' }
    ]
  });
};

exports.getByIdDirect = async (id) => {
  const record = await AnimalSQL.findByPk(id, {
    include: [
      { model: RescatistaSQL, as: 'rescatista' },
      { model: GeolocalizacionSQL, as: 'geolocalizacion' }
    ]
  });
  if (!record) throw new Error('Animal no encontrado en PostgreSQL');
  return record;
};

exports.updateDirect = async (id, data) => {
  const updated = await AnimalSQL.update(data, { where: { id } });
  if (updated[0] === 0) throw new Error('Animal no encontrado');
  return { message: 'Animal actualizado en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await AnimalSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Animal no encontrado');
  return { message: 'Animal eliminado de PostgreSQL' };
};

exports.getStatsByEspecieAndEstado = async () => {
  return await AnimalSQL.findAll({
    attributes: ['especie', 'estadoSalud', [sequelize.fn('COUNT', sequelize.col('id')), 'total']],
    group: ['especie', 'estadoSalud']
  });
};
