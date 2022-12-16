const dotenv = require('dotenv');
const envFound = dotenv.config();

// if (envFound.error) {
//   throw new Error("Couldn't find .env file");
// }

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
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
  timezone: process.env.MYSQL_TIMEZONE
};
