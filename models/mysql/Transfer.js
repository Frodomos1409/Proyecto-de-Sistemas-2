const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sqlDatabase');

const Transfer = sequelize.define('Transfer', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    animalId: { type: DataTypes.INTEGER, allowNull: false },
    fromLocation: { type: DataTypes.STRING, allowNull: false },
    toLocation: { type: DataTypes.STRING, allowNull: false },
    transferDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'transfers',
    timestamps: true
});

module.exports = Transfer;