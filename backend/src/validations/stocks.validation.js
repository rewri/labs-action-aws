const { body } = require('express-validator');

const create = [
  body('code')
    .trim()
    .optional()
    .isLength({ min: 1, max: 255 }).withMessage('O código deve ter entre 1 e 255 caracteres')
    .escape(),
  body('name')
    .trim()
    .notEmpty().withMessage('O nome do estoque é obrigatório')
    .isLength({ min: 1, max: 255 }).withMessage('O nome do estoque deve ter entre 1 e 255 caracteres')
    .escape()
];

module.exports = { create };
