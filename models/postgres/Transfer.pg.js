const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Transfer = sequelize.define('Transfer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  animalId: { type: DataTypes.INTEGER, allowNull: false },
  ubicacionAnterior: { type: DataTypes.STRING, allowNull: false },
  ubicacionNueva: { type: DataTypes.STRING, allowNull: false },
  motivo: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.STRING },
  responsable: { type: DataTypes.STRING }, // ✅ NUEVO CAMPO
  fechaTraslado: { type: DataTypes.DATE }
}, {
  tableName: 'transfers',
  timestamps: true
});

module.exports = Transfer;
