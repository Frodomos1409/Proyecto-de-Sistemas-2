exports.create = async (req, res) => {
  try {
    const { nombreAnimal, ...datos } = req.body;

    if (!nombreAnimal) {
      return res.status(400).json({ error: 'Debe incluir el campo "nombreAnimal"' });
    }

    const animalSQL = await AnimalSQL.findOne({ where: { nombre: nombreAnimal } });
    const animalMongo = await AnimalMongo.findOne({ nombre: nombreAnimal });

    if (!animalSQL || !animalMongo) {
      return res.status(404).json({ error: 'Animal no encontrado en una o ambas BD' });
    }

    const transferSQL = await TransferSQL.create({
      ...datos,
      animalId: animalSQL.id
    });

    const transferMongo = await new TransferMongo({
      ...datos,
      animalId: animalMongo._id
    }).save();

    res.status(201).json({ transferSQL, transferMongo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
