const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/sqlDatabase'); // Conexión MySQL
require('./config/database'); // Conexión MongoDB

// Rutas
const animalRoutes = require('./routes/animalRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const transferRoutes = require('./routes/transferRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoints para todos los modelos
app.use('/api/animales', animalRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/users', userRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('✅ API funcionando con MySQL y MongoDB');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);

    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a MySQL correctamente');
    } catch (error) {
        console.error('❌ Error en conexión a MySQL:', error);
    }
});
