const express = require('express');
const router = express.Router();

const animalRoutes = require('./animalRoutes');
const adoptionRoutes = require('./adoptionRoutes');
const evaluationRoutes = require('./evaluationRoutes');
const transferRoutes = require('./transferRoutes');
const userRoutes = require('./userRoutes');
const rescatistaRoutes = require('./rescatistaRoutes');
const liberationRoutes = require('./liberationRoutes');
const treatmentRoutes = require('./treatmentRoutes');
const reportRoutes = require('./reportRoutes');
const veterinarioRoutes = require('./veterinarioRoutes');
const geolocalizacionRoutes = require('./geolocalizacionRoutes');



// Montar cada ruta con su endpoint base
router.use('/animales', animalRoutes);
router.use('/adoptions', adoptionRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/transfers', transferRoutes);
router.use('/users', userRoutes);
router.use('/rescatistas', rescatistaRoutes);
router.use('/liberaciones', liberationRoutes);
router.use('/tratamientos', treatmentRoutes);
router.use('/reportes', reportRoutes);
router.use('/veterinarios', veterinarioRoutes);
router.use('/geolocalizaciones', geolocalizacionRoutes);

module.exports = router;
