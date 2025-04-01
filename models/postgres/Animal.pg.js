const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Animal = sequelize.define('Animal', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  especie: { type: DataTypes.STRING, allowNull: false },
  raza: { type: DataTypes.STRING, allowNull: false },
  sexo: { type: DataTypes.STRING, allowNull: false },
  edad: { type: DataTypes.INTEGER, allowNull: false },
  estadoSalud: { type: DataTypes.STRING, allowNull: false },
  tipoAlimentacion: { type: DataTypes.STRING, allowNull: false },
  cantidadRecomendada: { type: DataTypes.STRING, allowNull: false },
  frecuenciaRecomendada: { type: DataTypes.STRING, allowNull: false },
  fechaLiberacion: { type: DataTypes.DATE },
  ubicacionLiberacion: { type: DataTypes.STRING }
}, {
  tableName: 'animales',
  timestamps: false
});

module.exports = Animal;