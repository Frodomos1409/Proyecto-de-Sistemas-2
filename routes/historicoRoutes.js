// routes/historicoRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/historico/historicoController');

// GET /api/historico/:animalId
router.get('/:animalId', ctrl.getAll);

module.exports = router;
