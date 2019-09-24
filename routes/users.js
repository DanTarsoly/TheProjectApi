const router = require('express').Router();
const controller = require('../controllers/users');
const auth = require('../services/auth');

router.post('/', auth.admin, controller.create);

router.get('/', auth.admin, controller.findAll);

router.get('/:id', auth.admin, controller.findOne);

router.put('/:id', auth.admin, controller.update);

router.delete('/:id', auth.admin, controller.delete);

module.exports = router;
