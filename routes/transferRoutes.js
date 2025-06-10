const express = require('express');
const router = express.Router();
const controller = require('../controllers/transfer');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/ultima-ubicacion/:animalId', controller.getUltimaUbicacion);
router.get('/tracking/:animalId', controller.getTracking);

module.exports = router;
