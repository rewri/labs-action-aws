const repository = require('../repositories/stock_movements.repository.js');

module.exports = {

  async index(req, res, next) {
    try {
      const data = await repository.findAll();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhuma movimentação encontrada` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async findMovementDetail(req, res, next) {
    try {
      const { stock_id, product_id } = req.params;
      const data = await repository.findAllByStockAndProduct(stock_id, product_id);
      if (!data || data.length === 0) {
        res.send({ message: `Nenhuma movimentação encontrada` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async findMovementByStock(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findAllByStockId(id);
      if (!data || data.length === 0) {
        res.send({ message: `Nenhuma movimentação encontrada` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async findMovementByProduct(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findAllByProductId(id);
      if (!data || data.length === 0) {
        res.send({ message: `Nenhuma movimentação encontrada` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

}
