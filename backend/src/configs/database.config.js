const dotenv = require('dotenv');

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableNames: true,
  define: {
    timestamps: true,
    undescored: true,
  },
  dialectOptions: {
    useUTC: false,
    dateStrings: true,
    typeCast: true,
  },
  timezone: process.env.DB_TIMEZONE
};
