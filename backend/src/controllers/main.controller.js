const config = require('../configs/index.config.js');
const dateTimeHelper = require('../helpers/datetime.helper.js');

const categoriesRepository = require('../repositories/categories.repository.js');
const productsRepository = require('../repositories/products.repository.js');
const stocksRepository = require('../repositories/stocks.repository.js');

module.exports = {

  async index(req, res, next) {
    res.status(200).send({
      appName  : config.app_name,
      version  : config.app_version,
      uptime   : dateTimeHelper.fancyTimeFormat(process.uptime()),
      timestamp: Date.now(),
      env      : config.node_env
    });
  },

  async counters(req, res, next) {
    try {
      const categories = await categoriesRepository.findAll();
      const products   = await productsRepository.findAll();
      const stocks     = await stocksRepository.findAll();
      res.json({
        'products'  : products.length > 0 ? products.length    : 0,
        'categories': categories.length > 0 ? categories.length: 0,
        'stocks'    : stocks.length > 0 ? stocks.length        : 0
      });
    } catch (error) {
      next(error);
    }
  },

}
