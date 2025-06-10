const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

class Animal extends Model {
  static associate(models) {
    Animal.belongsTo(models.Rescatista, {
      foreignKey: 'rescatista_id',
      as: 'rescatista'
    });
    Animal.belongsTo(models.Geolocalizacion, {
      foreignKey: 'geolocalizacion_id',
      as: 'geolocalizacion'
    });
  }
}

Animal.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  especie: DataTypes.STRING,
  raza: DataTypes.STRING,
  sexo: DataTypes.STRING,
  edad: DataTypes.INTEGER,
  estadoSalud: DataTypes.STRING,
  tipoAlimentacion: DataTypes.STRING,
  cantidadRecomendada: DataTypes.STRING,
  frecuenciaRecomendada: DataTypes.STRING,
  fechaRescate: DataTypes.DATE,
  ubicacionRescate: DataTypes.STRING,
  detallesRescate: DataTypes.STRING,
  imagen: DataTypes.STRING,
  tipo: DataTypes.STRING,
  rescatista_id: {
    type: DataTypes.UUID,
    references: {
      model: 'rescatistas',
      key: 'id'
    }
  },
  geolocalizacion_id: {
    type: DataTypes.UUID,
    references: {
      model: 'geolocalizaciones',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Animal',
  tableName: 'animales',
  timestamps: true
});

module.exports = Animal;
