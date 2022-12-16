const express = require('express');
require('express-group-routes');

const controller = require('../controllers/main.controller.js');
const router = express.Router({ mergeParams: true });

router.get('/', controller.index);
router.get('/totais', controller.counters);

module.exports = router;
