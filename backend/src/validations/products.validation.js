const { body } = require('express-validator');

const create = [
  body('id_category')
    .trim()
    .notEmpty().withMessage('Categoria é obrigatório')
    .toInt(),
  body('name')
    .trim()
    .notEmpty().withMessage('Nome do produto é obrigatório')
    .isLength({ min: 1, max: 255 }).withMessage('Nome do produto deve ter entre 1 e 255 caracteres')
    .escape(),
  body('brand')
    .optional()
    .trim()
    .escape(),
  body('batch')
    .optional()
    .trim()
    .escape(),
  body('due_date')
    .optional()
    .trim()
    .toDate()
    .escape()
];

module.exports = { create };
