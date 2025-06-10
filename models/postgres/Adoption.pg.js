const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresConfig');

const Adoption = sequelize.define('Adoption', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  animalId: { type: DataTypes.UUID, allowNull: false },
  estado: DataTypes.STRING,
  nombreAdoptante: DataTypes.STRING,
  contactoAdoptante: DataTypes.STRING,
  observaciones: DataTypes.STRING,
  fechaAdopcion: DataTypes.DATE,
  geolocalizacionId: {
    type: DataTypes.UUID,
    references: {
      model: 'geolocalizaciones',
      key: 'id'
    }
  }
}, {
  tableName: 'adoptions',
  timestamps: true
});

Adoption.associate = (models) => {
  Adoption.belongsTo(models.Animal, {
    foreignKey: 'animalId',
    as: 'animal'
  });
  Adoption.belongsTo(models.Geolocalizacion, {
    foreignKey: 'geolocalizacionId',
    as: 'direccion'
  });
};

module.exports = Adoption;
