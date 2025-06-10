const express = require('express');
const router = express.Router();
const controller = require('../controllers/veterinario');
const upload = require('../middlewares/upload'); // Asegúrate de tenerlo configurado

router.post('/', upload.single('imagen'), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', upload.single('imagen'), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
