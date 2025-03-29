const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: process.env.SQL_DIALECT,
    port: process.env.SQL_PORT,
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ Conectado a MySQL Workbench correctamente'))
    .catch(err => console.error('❌ Error en conexión a MySQL:', err));

module.exports = sequelize;
