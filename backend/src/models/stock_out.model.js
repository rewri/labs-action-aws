const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');
const Stocks = require('./stocks.model.js');
const Products = require('./products.model.js');
const Users = require('./users.model.js');

const { v4: uuidv4 } = require('uuid');

class StockIn extends Model { }

StockIn.fields = [
  "uuid",
  "id_product",
  "id_stock",
  "id_user",
  "type",
  "amount",
  "description"
];

StockIn.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: uuidv4()
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize: sequelize,
    tableName: 'stock_movements',
    modelName: 'StockIn'
  },
);

StockIn.hasOne(Products, {
  as: 'product',
  sourceKey: 'id_product',
  foreignKey: 'id'
});

StockIn.hasOne(Stocks, {
  as: 'stock',
  sourceKey: 'id_stock',
  foreignKey: 'id'
});

StockIn.hasOne(Users, {
  as: 'user',
  sourceKey: 'id_user',
  foreignKey: 'id'
});

module.exports = StockIn;
