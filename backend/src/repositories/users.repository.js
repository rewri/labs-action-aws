const { Op } = require('sequelize');
const model = require('../models/users.model.js');

module.exports = {

  findAll() {
    return model.findAll({
      attributes: ['id', 'uuid', 'username', 'name', 'role', 'laboratory', 'description', 'enabled', 'createdAt']
    });
  },

  findByUuId(id) {
    return model.findOne({
      where: {
        uuid: id,
      },
    });
  },

  findByUsername(username) {
    return model.findOne({
      where: {
        username: username,
      },
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
