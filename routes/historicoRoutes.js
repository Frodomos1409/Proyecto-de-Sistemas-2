const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/historico/historicoController');

// Primero rutas específicas
router.get('/por-nombre/:nombreAnimal', ctrl.getByNombre);
// Luego rutas dinámicas generales
router.get('/:animalId', ctrl.getAll);

module.exports = router;
