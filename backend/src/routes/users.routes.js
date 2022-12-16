const express = require('express');
const validation = require('../services/validation.service.js');
const { create } = require('../validations/users.validation.js');
require('express-group-routes');

const controller = require('../controllers/users.controller.js');
const router = express.Router({ mergeParams: true });

router.group('/', (router) => {

  router.get('/', controller.index);

  router.get('/:id', controller.show);

  router.post('/', create, validation, controller.create);

  router.put('/:id', controller.update);

  router.delete('/:id', controller.delete);

});

module.exports = router;
