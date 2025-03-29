const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sqlDatabase');

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'animales',
    timestamps: false
});

module.exports = Animal;
