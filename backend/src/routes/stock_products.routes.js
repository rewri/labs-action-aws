const express = require('express');
require('express-group-routes');

const controller = require('../controllers/stock_products.controller.js');
const router = express.Router({ mergeParams: true });

router.group('/', (router) => {

  router.get('/', controller.index);

  router.get('/estoque/:id', controller.findAllByStockId);

  router.get('/produto/:id', controller.findAllByProductId);

});

module.exports = router;
