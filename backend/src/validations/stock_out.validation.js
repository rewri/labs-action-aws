const { body } = require('express-validator');

const create = [
  body('id_stock')
    .trim()
    .notEmpty().withMessage('id_stock é obrigatório')
    .isInt().withMessage('id_stock deve ser número inteiro')
    .toInt(),
  body('id_product')
    .trim()
    .notEmpty().withMessage('id_product é obrigatório')
    .isInt().withMessage('id_product deve ser número inteiro')
    .toInt(),
  body('id_user')
    .trim()
    .notEmpty().withMessage('id_user é obrigatório')
    .isInt().withMessage('id_user deve ser número inteiro')
    .toInt(),
  body('amount')
    .trim()
    .notEmpty().withMessage('amount é obrigatório')
    .isInt().withMessage('amount deve ser número inteiro')
    .toInt()
];

module.exports = { create };
