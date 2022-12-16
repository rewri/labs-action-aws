const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');

const { v4: uuidv4 } = require('uuid');

class Stock extends Model { }

Stock.fields = [
  "uuid",
  "name",
  "code",
  "description",
  "enabled"
];

Stock.init(
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
    code: {
      type: DataTypes.STRING(255),
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
    tableName: 'stocks',
    modelName: 'Stocks'
  }
);

module.exports = Stock;
