// models/postgres/Rescatista.pg.js
const { DataTypes, Model } = require('sequelize'); // Importa Model también

// QUITA: const Animal = require('./Animal.pg');

// Cambia a una definición de clase
class Rescatista extends Model {
  // Método estático para definir asociaciones
  static associate(models) {
    // Define association here
    Rescatista.hasMany(models.Animal, {
      foreignKey: 'rescatista_id', // Clave foránea en la tabla 'animales'
      as: 'animales'               // Alias
    });
  }
}

Rescatista.init({ // Usa Rescatista.init
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  fechaRescate: { type: DataTypes.DATE, allowNull: false },
  ubicacionRescate: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize: require('../../config/postgresConfig'), // Pasa sequelize aquí
  modelName: 'Rescatista', // Nombre del modelo
  tableName: 'rescatistas',
  timestamps: true
});

// QUITA: Rescatista.hasMany(Animal, ...);

module.exports = Rescatista;