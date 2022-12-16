const { version } = require('../configs/routes.config.js');

const mainRoutes  = require('./main.routes.js');
const usersRoutes = require('./users.routes.js');
const categoriesRoutes = require('./categories.routes.js');
const productsRoutes = require('./products.routes.js');
const stocksRoutes = require('./stocks.routes.js');
const stockInRoutes = require('./stock_in.routes.js');
const stockOutRoutes = require('./stock_out.routes.js');
const stockProductsRoutes = require('./stock_products.routes.js');
const stockMovementsRoutes = require('./stock_movements.routes.js');

const routes = [
  {
    route: `/${version}/`,
    router: mainRoutes,
  },
  {
    route: `/${version}/usuarios`,
    router: usersRoutes,
  },
  {
    route: `/${version}/categorias`,
    router: categoriesRoutes,
  },
  {
    route: `/${version}/produtos`,
    router: productsRoutes,
  },
  {
    route: `/${version}/estoques`,
    router: stocksRoutes,
  },
  {
    route: `/${version}/entradas`,
    router: stockInRoutes,
  },
  {
    route: `/${version}/saidas`,
    router: stockOutRoutes,
  },
  {
    route: `/${version}/estoque-produto`,
    router: stockProductsRoutes,
  },
  {
    route: `/${version}/movimentacao`,
    router: stockMovementsRoutes,
  },
];

module.exports = routes;
