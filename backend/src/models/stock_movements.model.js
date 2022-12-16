const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');
const Product = require('./products.model.js');
const Stock = require('./stocks.model.js');
const User = require('./users.model.js');

const { v4: uuidv4 } = require('uuid');

class StockMovement extends Model { }

StockMovement.fields = [
  "uuid",
  "id_stock",
  "id_product",
  "id_user",
  "type",
  "amount",
  "description"
];

StockMovement.init(
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
    modelName: 'stockMovement'
  },
);

StockMovement.hasOne(Product, {
  as: 'product',
  sourceKey: 'id_product',
  foreignKey: 'id'
});

StockMovement.hasOne(Stock, {
  as: 'stock',
  sourceKey: 'id_stock',
  foreignKey: 'id'
});

StockMovement.hasOne(User, {
  as: 'user',
  sourceKey: 'id_user',
  foreignKey: 'id'
});

module.exports = StockMovement;
