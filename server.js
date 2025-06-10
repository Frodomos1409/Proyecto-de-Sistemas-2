const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config();
console.log('🔧 Cargando configuración...');

const app = express();
app.use(cors());
app.use(express.json());

// 🖼️ Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔌 Conectar a MongoDB
require('./config/database');

// 🔌 Cargar modelos y asociaciones de PostgreSQL
const db = require('./models');
const sequelize = db.sequelize;

// 🌐 Rutas agrupadas
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// 🏠 Ruta base
app.get('/', (req, res) => {
  res.send('✅ API funcionando con PostgreSQL y MongoDB en paralelo');
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a PostgreSQL correctamente');

    // ⚠️ Usa "force: true" solo para desarrollo. Elimina y recrea las tablas.
    await sequelize.sync({ force: true });

    console.log('📦 Tablas recreadas y modelos sincronizados con PostgreSQL');
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar con PostgreSQL:', error.message);
  }
});
