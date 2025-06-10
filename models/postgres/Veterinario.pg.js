const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');



const Veterinario = sequelize.define('Veterinario', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  especialidad: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  imagen: { type: DataTypes.STRING }

}, {
  tableName: 'veterinarios',
  timestamps: true
});

module.exports = Veterinario;
