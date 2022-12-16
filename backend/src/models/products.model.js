const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');
const Category = require('./categories.model.js');

const { v4: uuidv4 } = require('uuid');

class Product extends Model { }

Product.fields = [
  "uuid",
  "id_category",
  "name",
  "description",
  "brand",
  "batch",
  "due_date",
  "enabled"
];

Product.init(
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
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    brand: {
      type: DataTypes.STRING(255),
    },
    batch: {
      type: DataTypes.STRING(255),
    },
    due_date: {
      type: DataTypes.DATE,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
    tableName: 'products',
    modelName: 'Products'
  }
);

Product.belongsTo(Category, {
  as: 'category',
  foreignKey: 'id_category',
  sourceKey: 'id'
});

module.exports = Product;
