const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Transfer = sequelize.define('Transfer', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  animalId: { type: DataTypes.UUID, allowNull: false },
  motivo: DataTypes.STRING,
  observaciones: DataTypes.STRING,
  responsable: DataTypes.STRING,
  fechaTraslado: DataTypes.DATE,
  geolocalizacionAnteriorId: {
    type: DataTypes.UUID,
    references: {
      model: 'geolocalizaciones',
      key: 'id'
    }
  },
  geolocalizacionNuevaId: {
    type: DataTypes.UUID,
    references: {
      model: 'geolocalizaciones',
      key: 'id'
    }
  }
}, {
  tableName: 'transfers',
  timestamps: true
});

Transfer.associate = (models) => {
  Transfer.belongsTo(models.Animal, { foreignKey: 'animalId', as: 'animal' });
  Transfer.belongsTo(models.Geolocalizacion, { foreignKey: 'geolocalizacionAnteriorId', as: 'ubicacionAnterior' });
  Transfer.belongsTo(models.Geolocalizacion, { foreignKey: 'geolocalizacionNuevaId', as: 'ubicacionNueva' });
};

module.exports = Transfer;
