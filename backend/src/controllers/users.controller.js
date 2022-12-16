const repository = require('../repositories/users.repository.js');
const { v4: uuidv4 } = require('uuid');

module.exports = {

  async index(req, res, next) {
    try {
      const data = await repository.findAll();
      if (!data || data.length === 0) {
        res.send({ message: `Nenhum usuário encontrado` }).status(200).end();
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
      const data = await repository.findByUuId(id);
      if (!data) {
        next({ message: `Usuário #${id} não encontrado`, status: 200 });
        return;
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { username } = req.body;
      const post = req.body;
      post.uuid = uuidv4();
      const found = await repository.findByUsername(username);
      if (found) {
        next({ message: `Username "${username}" já existe`, status: 400 });
        return;
      }
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
        next({ message: `Usuário #${id} não encontrado`, status: 200 });
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
        next({ message: `Usuário #${id} não encontrado`, status: 200 });
        return;
      }
      // criar método para soft delete
      await repository.delete(id);
      res.send({ message: `Usuário #${id} excluído` }).status(200).end();
    } catch (error) {
      next(error);
    }
  }
}
