const express = require('express');
const router = express.Router();

const controller = require('../controllers/animal');
const upload = require('../middlewares/upload');
router.post('/', upload.single('imagen'), controller.create);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/stats', controller.getStats);

router.put('/:id', upload.single('imagen'), controller.update);

module.exports = router;