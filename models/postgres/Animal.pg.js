const { DataTypes, Model } = require('sequelize'); 

class Animal extends Model {
  static associate(models) {
      Animal.belongsTo(models.Rescatista, {
      foreignKey: 'rescatista_id',
      as: 'rescatista'             
    });
  }
}

Animal.init({ 
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  especie: { type: DataTypes.STRING, allowNull: false },
  raza: { type: DataTypes.STRING, allowNull: false },
  sexo: { type: DataTypes.STRING, allowNull: false },
  edad: { type: DataTypes.INTEGER, allowNull: false },
  estadoSalud: { type: DataTypes.STRING, allowNull: false },
  tipoAlimentacion: { type: DataTypes.STRING, allowNull: false },
  cantidadRecomendada: { type: DataTypes.STRING, allowNull: false },
  frecuenciaRecomendada: { type: DataTypes.STRING, allowNull: false },
  fechaLiberacion: { type: DataTypes.DATE },
  ubicacionLiberacion: { type: DataTypes.STRING },
  rescatista_id: {
    type: DataTypes.INTEGER,
    allowNull: true,   
    references: {
      model: 'rescatistas',
      key: 'id'
    }
  }
}, {
  sequelize: require('../../config/postgresConfig'),
  modelName: 'Animal', 
  tableName: 'animales',
  timestamps: false
});

module.exports = Animal; 