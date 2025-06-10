const express = require('express');
const router = express.Router();
const controller = require('../controllers/rescatista');
const upload = require('../middlewares/upload'); // ⬅️ Asegúrate que esté

router.post('/', upload.single('imagen'), controller.create);
router.get('/', controller.getAll);
router.put('/:id', upload.single('imagen'), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
