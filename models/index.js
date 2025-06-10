const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgresConfig');

const db = {};

// Importar modelos
const Rescatista = require('./postgres/Rescatista.pg.js');
const Animal = require('./postgres/Animal.pg');
const User = require('./postgres/User.pg');
const Adoption = require('./postgres/Adoption.pg');
const Evaluation = require('./postgres/Evaluation.pg');
const Transfer = require('./postgres/Transfer.pg');
const Liberation = require('./postgres/Liberation.pg');
const Treatment = require('./postgres/Treatment.pg');
const Veterinario = require('./postgres/Veterinario.pg.js'); // ✅ AÑADIDO
const Geolocalizacion = require('./postgres/Geolocalizacion.pg');

// 🔧 Relaciones Animal - Rescatista
Animal.belongsTo(Rescatista, { foreignKey: 'rescatista_id', as: 'rescatista' });
Rescatista.hasMany(Animal, { foreignKey: 'rescatista_id', as: 'animales' });

// 🔁 Relaciones Animal - Otras entidades
Animal.hasMany(Adoption, { foreignKey: 'animalId' });
Adoption.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Evaluation, { foreignKey: 'animalId' });
Evaluation.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Transfer, { foreignKey: 'animalId' });
Transfer.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Liberation, { foreignKey: 'animalId' });
Liberation.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Treatment, { foreignKey: 'animalId' });
Treatment.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.belongsTo(Geolocalizacion, { foreignKey: 'geolocalizacion_id', as: 'geolocalizacion' });


// ✅ Relaciones Evaluation y Treatment con Veterinario
Evaluation.belongsTo(Veterinario, { foreignKey: 'responsableId', as: 'veterinario' });
Treatment.belongsTo(Veterinario, { foreignKey: 'responsableId', as: 'veterinario' });

// Registrar modelos
db.Rescatista = Rescatista;
db.Animal = Animal;
db.User = User;
db.Adoption = Adoption;
db.Evaluation = Evaluation;
db.Transfer = Transfer;
db.Liberation = Liberation;
db.Treatment = Treatment;
db.Veterinario = Veterinario; // ✅ AÑADIDO
db.Geolocalizacion = Geolocalizacion;

db.sequelize = sequelize;

module.exports = db;
