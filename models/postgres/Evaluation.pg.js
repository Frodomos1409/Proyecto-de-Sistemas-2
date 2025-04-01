const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Evaluation = sequelize.define('Evaluation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  animalId: { type: DataTypes.INTEGER, allowNull: false },
  diagnostico: { type: DataTypes.STRING, allowNull: false },
  sintomasObservados: { type: DataTypes.STRING },
  tratamientoAdministrado: { type: DataTypes.STRING },
  medicacionRecetada: { type: DataTypes.STRING },
  veterinario: { type: DataTypes.STRING },
  fechaEvaluacion: { type: DataTypes.DATE },
  proximaRevision: { type: DataTypes.DATE }
}, {
  tableName: 'evaluations',
  timestamps: true
});

module.exports = Evaluation;