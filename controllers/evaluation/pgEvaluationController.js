const EvaluationSQL = require('../../models/postgres/Evaluation.pg');
const AnimalSQL = require('../../models/postgres/Animal.pg');
const VeterinarioSQL = require('../../models/postgres/Veterinario.pg');

exports.createDirect = async (data, id) => {
  const { nombreAnimal, responsableNombre, ...rest } = data;

  const animal = await AnimalSQL.findOne({ where: { nombre: nombreAnimal } });
  if (!animal) throw new Error('Animal no encontrado en PostgreSQL');

  const veterinario = await VeterinarioSQL.findOne({ where: { nombre: responsableNombre } });
  if (!veterinario) throw new Error('Veterinario no encontrado en PostgreSQL');

  return await EvaluationSQL.create({
    id,
    ...rest,
    animalId: animal.id,
    responsableId: veterinario.id
  });
};

exports.getAllDirect = async () => {
  const evaluaciones = await EvaluationSQL.findAll({
    include: [
      { model: AnimalSQL, as: 'animal', attributes: ['nombre'] },
      { model: VeterinarioSQL, as: 'veterinario', attributes: ['nombre'] }
    ]
  });

  return evaluaciones.map(e => ({
    ...e.toJSON(),
    nombreAnimal: e.animal?.nombre,
    responsableNombre: e.veterinario?.nombre
  }));
};

exports.getByIdDirect = async (id) => {
  const record = await EvaluationSQL.findByPk(id, {
    include: [
      { model: AnimalSQL, as: 'animal', attributes: ['nombre'] },
      { model: VeterinarioSQL, as: 'veterinario', attributes: ['nombre'] }
    ]
  });
  if (!record) throw new Error('Evaluación no encontrada en PostgreSQL');
  return {
    ...record.toJSON(),
    nombreAnimal: record.animal?.nombre,
    responsableNombre: record.veterinario?.nombre
  };
};

exports.updateDirect = async (id, data) => {
  const { responsableNombre, ...rest } = data;

  let responsableId = null;
  if (responsableNombre) {
    const vet = await VeterinarioSQL.findOne({ where: { nombre: responsableNombre } });
    if (!vet) throw new Error('Veterinario no encontrado para actualizar');
    responsableId = vet.id;
  }

  const updated = await EvaluationSQL.update(
    { ...rest, responsableId },
    { where: { id } }
  );
  if (updated[0] === 0) throw new Error('Evaluación no encontrada');
  return { message: 'Evaluación actualizada en PostgreSQL' };
};

exports.deleteDirect = async (id) => {
  const deleted = await EvaluationSQL.destroy({ where: { id } });
  if (!deleted) throw new Error('Evaluación no encontrada');
  return { message: 'Evaluación eliminada de PostgreSQL' };
};
