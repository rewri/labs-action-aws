const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database.service.js');

const { v4: uuidv4 } = require('uuid');

class User extends Model { }

User.fields = [
  "uuid",
  "id_profile",
  "username",
  "password",
  "name",
  "role",
  "laboratory",
  "description",
  "enabled"
];

User.init(
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
    id_profile: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(255),
    },
    laboratory: {
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
    tableName: 'users',
    modelName: 'Users'
  }
);

module.exports = User;
