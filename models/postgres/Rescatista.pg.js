const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

class Rescatista extends Model {}

Rescatista.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: false },
  fechaRescatista: { type: DataTypes.DATE, allowNull: false },
  imagen: { type: DataTypes.STRING },
  geolocalizacionId: {
    type: DataTypes.UUID,
    references: {
      model: 'geolocalizaciones',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Rescatista',
  tableName: 'rescatistas',
  timestamps: true
});

Rescatista.associate = (models) => {
  Rescatista.belongsTo(models.Geolocalizacion, {
    foreignKey: 'geolocalizacionId',
    as: 'ubicacion'
  });
};

module.exports = Rescatista;
