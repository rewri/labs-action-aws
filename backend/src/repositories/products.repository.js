const { Op } = require('sequelize');
const model = require('../models/products.model.js');
const categories = require('../models/categories.model.js');

module.exports = {

  findAll() {
    return model.findAll({
      include: [
        {
          model: categories,
          as: 'category',
          attributes: ['id', 'uuid', 'name']
        },
      ],
      order: [
        ['name', 'ASC']
      ]
    });
  },

  findById(id) {
    return model.findByPk(id, {
      include: [
        {
          model: categories,
          as: 'category',
          attributes: ['id', 'uuid', 'name']
        },
      ]
    });
  },

  findByCategoryId(id) {
    return model.findAll({
      where: {
        id_category: id
      }
    });
  },

  create(data) {
    return model.create(data, { fields: model.fields });
  },

  update(data, newData) {
    return data.update(newData);
  },

  delete(id) {
    return model.destroy({
      where: {
        id: id,
      },
    });
  },

};
