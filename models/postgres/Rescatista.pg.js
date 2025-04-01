const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Rescatista = sequelize.define('Rescatista', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  fechaRescate: { type: DataTypes.DATE, allowNull: false },
  ubicacionRescate: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'rescatistas',
  timestamps: true
});

module.exports = Rescatista;
