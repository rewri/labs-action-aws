const { Op } = require('sequelize');
const model = require('../models/stocks.model.js');

module.exports = {

  findAll() {
    return model.findAll({
      order: [
        ['name', 'ASC']
      ]
    });
  },

  findById(id) {
    return model.findByPk(id);
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
