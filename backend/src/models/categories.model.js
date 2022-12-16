const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');

const { v4: uuidv4 } = require('uuid');

class Category extends Model { }

Category.fields = [
  "uuid",
  "name",
  "description",
  "enabled"
];

Category.init(
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
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
    tableName: 'categories',
    modelName: 'Categories'
  }
);

module.exports = Category;
