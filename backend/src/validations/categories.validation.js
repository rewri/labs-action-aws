const { body } = require('express-validator');

const create = [
  body('name')
    .trim()
    .notEmpty().withMessage('O nome da categoria é obrigatório')
    .isLength({ min: 1, max: 255 }).withMessage('O nome da categoria deve ter entre 1 e 255 caracteres')
    .escape()
];

module.exports = { create };
