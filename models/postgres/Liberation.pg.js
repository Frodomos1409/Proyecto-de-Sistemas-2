const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Liberation = sequelize.define('Liberation', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  animalId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  fechaLiberacion: { type: DataTypes.DATE, allowNull: false },
  observaciones: DataTypes.STRING,
  geolocalizacionId: {
    type: DataTypes.UUID,
    references: {
      model: 'geolocalizaciones',
      key: 'id'
    }
  }
}, {
  tableName: 'liberations',
  timestamps: true
});

Liberation.associate = (models) => {
  Liberation.belongsTo(models.Animal, {
    foreignKey: 'animalId',
    as: 'animal'
  });
  Liberation.belongsTo(models.Geolocalizacion, {
    foreignKey: 'geolocalizacionId',
    as: 'ubicacionLiberacion'
  });
};

module.exports = Liberation;
