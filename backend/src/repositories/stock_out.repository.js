const { Op } = require('sequelize');
const model = require('../models/stock_out.model.js');
const stocks = require('../models/stocks.model.js');
const products = require('../models/products.model.js');
const users = require('../models/users.model.js');

module.exports = {

  findAll() {
    return model.findAll({
      where: {
        type: 2 // saída
      },
      include: [
        {
          model: stocks,
          as: 'stock',
          attributes: ['uuid', 'name', 'code']
        },
        {
          model: products,
          as: 'product',
          attributes: ['uuid', 'name', 'brand'],
        },
        {
          model: users,
          as: 'user',
          attributes: ['uuid', 'name', 'laboratory']
        }
      ]
    });
  },

  findByUuid(id) {
    return model.findOne({
      where: {
        uuid: id
      },
      include: [
        {
          model: stocks,
          as: 'stock',
        },
        {
          model: products,
          as: 'product',
        },
        {
          model: users,
          as: 'user',
          attributes: ['uuid', 'name', 'role', 'laboratory']
        }
      ]
    });
  },

  findById(id) {
    return model.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: stocks,
          as: 'stock',
        },
        {
          model: products,
          as: 'product',
        },
        {
          model: users,
          as: 'user',
          attributes: ['uuid', 'name', 'role', 'laboratory']
        }
      ]
    });
  },

  create(data) {
    return model.create(data, { fields: model.fields });
  },

};
