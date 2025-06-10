const express = require('express');
const router = express.Router();
const controller = require('../controllers/report');

router.get('/por-especie', controller.getBySpecies);
router.get('/por-tipo', controller.getByType);
router.get('/liberaciones-por-mes', controller.getLiberationsPerMonth);
router.get('/evaluaciones-por-animal', controller.getEvaluationsPerAnimal);
router.get('/traslados-por-animal', controller.getTransfersPerAnimal);

module.exports = router;
