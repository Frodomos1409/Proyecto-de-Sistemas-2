const TreatmentMongo = require('../../models/mongo/TreatmentMongo');
const AnimalMongo = require('../../models/mongo/AnimalMongo');
const VeterinarioMongo = require('../../models/mongo/VeterinarioMongo');

exports.createDirect = async (data, id) => {
  const { nombreAnimal, responsableNombre, ...rest } = data;

  const animal = await AnimalMongo.findOne({ nombre: nombreAnimal });
  if (!animal) throw new Error('Animal no encontrado en MongoDB');

  const veterinario = await VeterinarioMongo.findOne({ nombre: responsableNombre });
  if (!veterinario) throw new Error('Veterinario no encontrado en MongoDB');

  return await new TreatmentMongo({
    _id: id,
    ...rest,
    animalId: animal._id,
    responsableId: veterinario._id
  }).save();
};

exports.getAllDirect = async () => {
  const treatments = await TreatmentMongo.find()
    .populate({ path: 'animalId', select: 'nombre' })
    .populate({ path: 'responsableId', select: 'nombre' });

  return treatments.map(t => ({
    ...t.toObject(),
    nombreAnimal: t.animalId?.nombre,
    responsableNombre: t.responsableId?.nombre
  }));
};

exports.getByIdDirect = async (id) => {
  const record = await TreatmentMongo.findById(id)
    .populate({ path: 'animalId', select: 'nombre' })
    .populate({ path: 'responsableId', select: 'nombre' });

  if (!record) throw new Error('Tratamiento no encontrado');
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

  const updated = await TreatmentMongo.findByIdAndUpdate(
    id,
    { ...rest, responsableId },
    { new: true }
  );
  if (!updated) throw new Error('Tratamiento no encontrado');
  return { message: 'Tratamiento actualizado en MongoDB' };
};

exports.deleteDirect = async (id) => {
  const deleted = await TreatmentMongo.findByIdAndDelete(id);
  if (!deleted) throw new Error('Tratamiento no encontrado');
  return { message: 'Tratamiento eliminado de MongoDB' };
};
