const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Adoption = sequelize.define('Adoption', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  animalId: { type: DataTypes.INTEGER, allowNull: false },
  estado: { type: DataTypes.STRING },
  nombreAdoptante: { type: DataTypes.STRING, allowNull: false },
  contactoAdoptante: { type: DataTypes.STRING, allowNull: false },
  direccionAdoptante: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.STRING },
  fechaAdopcion: { type: DataTypes.DATE }
}, {
  tableName: 'adoptions',
  timestamps: true
});

module.exports = Adoption;