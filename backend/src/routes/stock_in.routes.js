const express = require('express');
const validation = require('../services/validation.service.js');
const { create } = require('../validations/stock_in.validation.js');
require('express-group-routes');

const controller = require('../controllers/stock_in.controller.js');
const router = express.Router({ mergeParams: true });

router.group('/', (router) => {

  router.get('/', controller.index);

  router.get('/:id', controller.show);

  router.post('/', create, validation, controller.create, controller.updateAmount);

});

module.exports = router;
