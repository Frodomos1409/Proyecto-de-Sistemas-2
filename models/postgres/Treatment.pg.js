const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

class Treatment extends Model {
  static associate(models) {
    Treatment.belongsTo(models.Animal, {
      foreignKey: 'animalId',
      as: 'animal'
    });
    Treatment.belongsTo(models.Veterinario, {
      foreignKey: 'responsableId',
      as: 'veterinario'
    });
  }
}

Treatment.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  animalId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  tratamiento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracion: DataTypes.STRING,
  observaciones: DataTypes.STRING,
  responsableId: { // ✅ cambiado
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'veterinarios',
      key: 'id'
    }
  },
  fechaTratamiento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Treatment',
  tableName: 'treatments',
  timestamps: true
});

module.exports = Treatment;
