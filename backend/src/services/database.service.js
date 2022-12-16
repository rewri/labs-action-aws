const Sequelize = require('sequelize');
const dbConfig = require('../configs/database.config.js');
const connection = new Sequelize(dbConfig);
module.exports = connection;
