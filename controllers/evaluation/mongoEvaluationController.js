const EvaluationMongo = require('../../models/mongo/EvaluationMongo');
const AnimalMongo = require('../../models/mongo/AnimalMongo');
const VeterinarioMongo = require('../../models/mongo/VeterinarioMongo');

exports.createDirect = async (data, id) => {
  const { nombreAnimal, responsableNombre, ...rest } = data;

  const animal = await AnimalMongo.findOne({ nombre: nombreAnimal });
  if (!animal) throw new Error('Animal no encontrado en MongoDB');

  const veterinario = await VeterinarioMongo.findOne({ nombre: responsableNombre });
  if (!veterinario) throw new Error('Veterinario no encontrado en MongoDB');

  return await new EvaluationMongo({
    _id: id,
    ...rest,
    animalId: animal._id,
    responsableId: veterinario._id
  }).save();
};

exports.getAllDirect = async () => {
  const evaluaciones = await EvaluationMongo.find()
    .populate({ path: 'animalId', select: 'nombre' })
    .populate({ path: 'responsableId', select: 'nombre' });

  return evaluaciones.map(e => ({
    ...e.toObject(),
    nombreAnimal: e.animalId?.nombre,
    responsableNombre: e.responsableId?.nombre
  }));
};

exports.getByIdDirect = async (id) => {
  const record = await EvaluationMongo.findById(id)
    .populate({ path: 'animalId', select: 'nombre' })
    .populate({ path: 'responsableId', select: 'nombre' });

  if (!record) throw new Error('Evaluación no encontrada');
  return {
    ...record.toObject(),
    nombreAnimal: record.animalId?.nombre,
    responsableNombre: record.responsableId?.nombre
  };
};

exports.updateDirect = async (id, data) => {
  const { responsableNombre, ...rest } = data;

  let responsableId = undefined;
  if (responsableNombre) {
    const vet = await VeterinarioMongo.findOne({ nombre: responsableNombre });
    if (!vet) throw new Error('Veterinario no encontrado en MongoDB');
    responsableId = vet._id;
  }

  const updated = await EvaluationMongo.findByIdAndUpdate(
    id,
    { ...rest, responsableId },
    { new: true }
  );
  if (!updated) throw new Error('Evaluación no encontrada');
  return { message: 'Evaluación actualizada en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await EvaluationMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Evaluación no encontrada');
  return { message: 'Evaluación eliminada de MongoDB' };
};
