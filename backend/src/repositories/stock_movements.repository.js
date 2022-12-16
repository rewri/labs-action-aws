const { Op } = require('sequelize');
const model = require('../models/stock_movements.model.js');
const products = require('../models/products.model.js');
const stocks = require('../models/stocks.model.js');
const users = require('../models/users.model.js');

module.exports = {

  findAll() {
    return model.findAll({
      include: [
        {
          model: products,
          as: 'product',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: stocks,
          as: 'stock',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: users,
          as: 'user',
          attributes: ['id', 'uuid', 'name']
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
  },

  findAllByStockId(id) {
    return model.findAll({
      where: {
        id_stock: id
      },
      include: [
        {
          model: products,
          as: 'product',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: stocks,
          as: 'stock',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: users,
          as: 'user',
          attributes: ['id', 'uuid', 'name']
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
  },

  findAllByProductId(id) {
    return model.findAll({
      where: {
        id_product: id
      },
      include: [
        {
          model: products,
          as: 'product',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: stocks,
          as: 'stock',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: users,
          as: 'user',
          attributes: ['id', 'uuid', 'name']
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
  },

  findAllByStockAndProduct(id_stock, id_product) {
    return model.findAll({
      where: {
        id_stock: id_stock,
        id_product: id_product,
      },
      include: [
        {
          model: products,
          as: 'product',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: stocks,
          as: 'stock',
          attributes: ['id', 'uuid', 'name']
        },
        {
          model: users,
          as: 'user',
          attributes: ['id', 'uuid', 'name']
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
  },

};
