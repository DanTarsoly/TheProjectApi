const router = require('express').Router();
const controller = require('../controllers/places');
const auth = require('../services/auth');

router.post('/', auth.any, controller.create);

router.get('/', auth.any, controller.findAll);

router.get('/:id', auth.any, controller.findOne);

router.put('/:id', auth.admin, controller.update);

router.delete('/:id', auth.admin, controller.delete);

module.exports = router;
