const Adoption = sequelize.define('Adoption', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  animalId: { type: DataTypes.INTEGER },
  estado: { type: DataTypes.STRING },
  nombreAdoptante: { type: DataTypes.STRING },
  contactoAdoptante: { type: DataTypes.STRING },
  direccionAdoptante: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.STRING },
  fechaAdopcion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'adoptions',
  timestamps: true
});

module.exports = Adoption;
