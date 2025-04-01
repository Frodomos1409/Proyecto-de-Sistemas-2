const Transfer = sequelize.define('Transfer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  animalId: { type: DataTypes.INTEGER },
  ubicacionAnterior: { type: DataTypes.STRING },
  ubicacionNueva: { type: DataTypes.STRING },
  motivo: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.STRING },
  fechaTraslado: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'transfers',
  timestamps: true
});

module.exports = Transfer;