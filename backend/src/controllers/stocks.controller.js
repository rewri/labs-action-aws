const repository = require('../repositories/stocks.repository.js');
const stockProductsRepository = require('../repositories/stock_products.repository.js');

const { v4: uuidv4 } = require('uuid');

module.exports = {

  async index(req, res, next) {
    try {
      const data = await repository.findAll();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum estoque encontrado` }).status(200).end();
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findById(id);
      if (!data) {
        next({ message: `Estoque #${id} não encontrado`, status: 200 });
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const post = req.body;
      post.uuid = uuidv4();
      const data = await repository.create(post);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findById(id);
      if (!data) {
        next({ message: `Estoque #${id} não encontrado`, status: 200 });
        return;
      }
      const updated = await repository.update(data, req.body);
      res.send(updated);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await repository.findById(id);
      if (!data) {
        next({ message: `Estoque #${id} não encontrado`, status: 200 });
        return;
      }
      const products = await stockProductsRepository.findByStockId(id);
      if (products.length > 0) {
        next({ message: `Não é possível excluir. Existem produtos neste estoque.`, status: 406 });
        return;
      }
      await repository.delete(id);
      res.send({ message: `Estoque #${id} excluído` }).status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
