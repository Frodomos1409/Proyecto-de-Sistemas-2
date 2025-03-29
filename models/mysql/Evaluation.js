const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sqlDatabase');

const Evaluation = sequelize.define('Evaluation', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    animalId: { type: DataTypes.INTEGER, allowNull: false },
    veterinarian: { type: DataTypes.STRING, allowNull: false },
    diagnosis: { type: DataTypes.STRING, allowNull: false },
    treatment: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'evaluations',
    timestamps: true
});

module.exports = Evaluation;
