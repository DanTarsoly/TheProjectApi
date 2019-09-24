const router = require('express').Router();
const controller = require('../controllers/reviews');
const auth = require('../services/auth');

router.post('/', auth.any, controller.create);

router.get('/', auth.any, controller.findAll);

router.get('/:id', auth.any, controller.findOne);

router.put('/:id', auth.any, controller.update);

router.delete('/:id', auth.any, controller.delete);

module.exports = router;
