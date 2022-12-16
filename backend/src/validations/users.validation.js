const { body } = require('express-validator');

const create = [
  body('id_profile')
    .trim()
    .notEmpty().withMessage('id_profile é obrigatório')
    .isInt().withMessage('id_profile deve ser número inteiro')
    .isIn([1, 2]).withMessage('id_profile deve ser 1 ou 2')
    .toInt(),
  body('username')
    .trim()
    .notEmpty().withMessage('username é obrigatório')
    .isLength({ min: 1, max: 255 }).withMessage('username deve ter entre 1 e 255 caracteres')
    .escape(),
  body('password')
    .trim()
    .notEmpty().withMessage('password é obrigatório')
    .isLength({ min: 1, max: 255 }).withMessage('password deve ter entre 1 e 255 caracteres')
    .escape(),
  body('name')
    .trim()
    .notEmpty().withMessage('name é obrigatório')
    .isLength({ min: 1, max: 255 }).withMessage('name deve ter entre 1 e 255 caracteres')
    .escape(),
  body('role')
    .trim()
    .isLength({ min: 1, max: 255 }).withMessage('role deve ter entre 1 e 255 caracteres')
    .escape(),
  body('laboratory')
    .trim()
    .isLength({ min: 1, max: 255 }).withMessage('laboratory deve ter entre 1 e 255 caracteres')
    .escape(),
];

module.exports = { create };
