const repository = require('../repositories/stock_out.repository.js');
const productsRepository = require('../repositories/products.repository.js');
const stocksRepository = require('../repositories/stocks.repository.js');
const stockProductsRepository = require('../repositories/stock_products.repository.js');

const { v4: uuidv4 } = require('uuid');

module.exports = {

  async index(req, res, next) {
    try {
      const data = await repository.findAll();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum saída encontrada` }).status(200).end();
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
        next({ message: `Saída #${id} não encontrada`, status: 200 });
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
      post.type = 2; // saída
      const hasProduct = await productsRepository.findById(post.id_product);
      if (!hasProduct) {
        next({ message: `Produto #${post.id_product} não encontrado`, status: 422 });
        return;
      }
      const hasStock = await stocksRepository.findById(post.id_stock);
      if (!hasStock) {
        next({ message: `Estoque #${post.id_stock} não encontrado`, status: 422 });
        return;
      }
      if (post.amount < 0) {
        next({ message: `Quantidade não pode ser menor que zero`, status: 422 });
        return;
      }
      const found = await stockProductsRepository.findByIdStockAndIdProduct(post.id_stock, post.id_product);
      if (found && found.amount < req.body.amount) {
        next({ message: `Só existem ${found.amount} produtos em estoque. Não foi possível fazer a retirada.`, status: 200 });
        return;
      }
      await repository.create(post);
      next();
    } catch (error) {
      next(error);
    }
  },

  async updateAmount(req, res, next) {
    try {
      const { id_stock, id_product } = req.body;
      const found = await stockProductsRepository.findByIdStockAndIdProduct(id_stock, id_product);
      if (found) {
        req.body.amount = +(found.amount - req.body.amount);
        const updated = await stockProductsRepository.update(found, req.body);
        return res.status(200).json(updated).end();
      }
      const data = await stockProductsRepository.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

}
