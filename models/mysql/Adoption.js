const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sqlDatabase');

const Adoption = sequelize.define('Adoption', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    animalId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    adopterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adopterContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adoptionDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'adoptions',
    timestamps: true
});

module.exports = Adoption;
