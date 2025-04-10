const express = require('express');
const router = express.Router();
const controller = require('../controllers/evaluationController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/animal/:animalId', controller.getByAnimalId); // NUEVA RUTA
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
