const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DB_NAME,
  process.env.PG_DB_USER,
  process.env.PG_DB_PASSWORD,
  {
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conectado a PostgreSQL correctamente'))
  .catch(err => console.error('❌ Error en conexión a PostgreSQL:', err));

module.exports = sequelize;
