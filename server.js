const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/postgresConfig'); // PostgreSQL
require('./config/database'); // MongoDB

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const animalRoutes = require('./routes/animalRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const transferRoutes = require('./routes/transferRoutes');
const userRoutes = require('./routes/userRoutes');
const rescatistaRoutes = require('./routes/rescatistaRoutes'); // ✅ Agregado

// Endpoints
app.use('/api/animales', animalRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rescatistas', rescatistaRoutes); 

// Ruta base
app.get('/', (req, res) => {
    res.send('✅ API funcionando con PostgreSQL y MongoDB');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);

    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a PostgreSQL correctamente');

        // Sincronizar todos los modelos
        await sequelize.sync({ alter: true });
        console.log('📦 Modelos sincronizados con PostgreSQL');
    } catch (error) {
        console.error('❌ Error conectando o sincronizando con PostgreSQL:', error);
    }
});
