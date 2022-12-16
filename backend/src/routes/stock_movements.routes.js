const express = require('express');
require('express-group-routes');

const controller = require('../controllers/stock_movements.controller.js');
const router = express.Router({ mergeParams: true });

router.group('/', (router) => {

  router.get('/', controller.index);

  router.get('/estoque/:stock_id/produto/:product_id', controller.findMovementDetail);

  router.get('/estoque/:id/', controller.findMovementByStock);

  router.get('/produto/:id/', controller.findMovementByProduct);

});

module.exports = router;
