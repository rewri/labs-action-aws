const repository = require('../repositories/stock_products.repository.js');

const { v4: uuidv4 } = require('uuid');

module.exports = {

  async index(req, res, next) {
    try {
      const data = await repository.findAll();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum produto encontrado` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async findAllByStockId(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findAllByStockId(id);
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum produto encontrado` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async findAllByProductId(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findAllByProductId(id);
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum produto encontrado` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

}
