const repository = require('../repositories/categories.repository.js');
const productsRepository = require('../repositories/products.repository.js');
const { v4: uuidv4 } = require('uuid');

module.exports = {

  async index(req, res, next) {
    try {
      const data = await repository.findAll();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhuma categoria encontrada` }).status(200).end();
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
        next({ message: `Categoria #${id} não encontrada`, status: 200 });
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
        next({ message: `Categoria #${id} não encontrada`, status: 200 });
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
        next({ message: `Categoria #${id} não encontrada`, status: 200 });
        return;
      }
      const products = await productsRepository.findByCategoryId(id);
      if (products.length > 0) {
        next({ message: `Não é possível excluir. Existem produtos nesta categoria.`, status: 406 });
        return;
      }
      await repository.delete(id);
      res.send({ message: `Categoria #${id} excluída` }).status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
