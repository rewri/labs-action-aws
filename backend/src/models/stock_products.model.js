const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');
const Product = require('./products.model.js');
const Stock = require('./stocks.model.js');

const { v4: uuidv4 } = require('uuid');

class StockProduct extends Model { }

StockProduct.fields = [
  "uuid",
  "id_stock",
  "id_product",
  "amount",
];

StockProduct.init(
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'stock_products',
    modelName: 'stockProduct'
  },
);

StockProduct.hasOne(Product, {
  as: 'product',
  sourceKey: 'id_product',
  foreignKey: 'id'
});

StockProduct.hasOne(Stock, {
  as: 'stock',
  sourceKey: 'id_stock',
  foreignKey: 'id'
});

module.exports = StockProduct;
