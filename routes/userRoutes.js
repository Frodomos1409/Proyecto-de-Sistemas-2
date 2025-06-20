const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
