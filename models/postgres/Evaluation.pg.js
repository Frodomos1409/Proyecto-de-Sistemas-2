const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

class Evaluation extends Model {
  static associate(models) {
    Evaluation.belongsTo(models.Animal, {
      foreignKey: 'animalId',
      as: 'animal'
    });
    Evaluation.belongsTo(models.Veterinario, {
      foreignKey: 'responsableId',
      as: 'veterinario'
    });
  }
}

Evaluation.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  animalId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  diagnostico: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sintomas: {
    type: DataTypes.STRING
  },
  medicacion: {
    type: DataTypes.STRING
  },
  responsableId: { // ✅ cambiado
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'veterinarios',
      key: 'id'
    }
  },
  fechaEvaluacion: {
    type: DataTypes.DATE
  },
  proximaRevision: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'Evaluation',
  tableName: 'evaluations',
  timestamps: true
});

module.exports = Evaluation;
