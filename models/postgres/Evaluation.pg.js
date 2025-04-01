const Evaluation = sequelize.define('Evaluation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  animalId: { type: DataTypes.INTEGER, allowNull: false },
  diagnostico: { type: DataTypes.STRING },
  sintomas: { type: DataTypes.STRING },
  tratamiento: { type: DataTypes.STRING },
  medicacion: { type: DataTypes.STRING },
  veterinario: { type: DataTypes.STRING },
  fechaEvaluacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  proximaRevision: { type: DataTypes.DATE }
}, {
  tableName: 'evaluations',
  timestamps: true
});

module.exports = Evaluation;
