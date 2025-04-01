const Animal = sequelize.define('Animal', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  especie: { type: DataTypes.STRING },
  raza: { type: DataTypes.STRING },
  sexo: { type: DataTypes.STRING },
  edad: { type: DataTypes.INTEGER },
  estadoSalud: { type: DataTypes.STRING },
  tipoAlimentacion: { type: DataTypes.STRING },
  cantidadRecomendada: { type: DataTypes.STRING },
  frecuenciaRecomendada: { type: DataTypes.STRING },
  fechaLiberacion: { type: DataTypes.DATE },
  ubicacionLiberacion: { type: DataTypes.STRING }
}, {
  tableName: 'animales',
  timestamps: false
});

module.exports = Animal;
