const { Op } = require('sequelize');
const model = require('../models/stock_products.model.js');
const products = require('../models/products.model.js');
const stocks = require('../models/stocks.model.js');

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
      ],
      order: [
        ['updatedAt', 'DESC']
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
      ],
      order: [
        ['updatedAt', 'DESC']
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
      ],
      order: [
        ['updatedAt', 'DESC']
      ]
    });
  },

  findByIdStockAndIdProduct(id_stock, id_product) {
    return model.findOne({
      where: {
        id_stock: id_stock,
        id_product: id_product,
      },
    });
  },

  findByProductId(id) {
    return model.findAll({
      where: {
        id_product: id
      }
    });
  },

  findByStockId(id) {
    return model.findAll({
      where: {
        id_stock: id
      }
    });
  },

  findAllLessThanTen() {
    return model.findAll({
      where: {
        'amount': {
          [Op.lte]: 10
        }
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
      ],
      order: [
        ['amount', 'ASC']
      ]
    });
  },

  create(data) {
    return model.create(data, { fields: model.fields });
  },

  update(data, newData) {
    return data.update(newData);
  },

};
