const repository = require('../repositories/products.repository.js');
const stockProductsRepository = require('../repositories/stock_products.repository.js');
const categoriesRepository = require('../repositories/categories.repository.js');

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

  async lessThanTen(req, res, next) {
    try {
      const data = await stockProductsRepository.findAllLessThanTen();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum produto encontrado` }).status(200).end();
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
        next({ message: `Produto #${id} não encontrado`, status: 200 });
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
      const category = await categoriesRepository.findById(post.id_category);
      if (!category) {
        next({ message: `A categoria informada não existe.`, status: 406 });
        return;
      }
      post.due_date = post.due_date == '' ? null : post.due_date;
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
        next({ message: `Produto #${id} não encontrado`, status: 200 });
        return;
      }
      if (req.body.id_category) {
        const category = await categoriesRepository.findById(req.body.id_category);
        if (!category) {
          next({ message: `A categoria informada não existe.`, status: 406 });
          return;
        }
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
        next({ message: `Produto #${id} não encontrado`, status: 200 });
        return;
      }
      const stocks = await stockProductsRepository.findByProductId(id);
      if (stocks.length > 0) {
        next({ message: `Não é possível excluir. Existem estoques com esse produto.`, status: 406 });
        return;
      }
      await repository.delete(id);
      res.send({ message: `Produto #${id} excluído` }).status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
