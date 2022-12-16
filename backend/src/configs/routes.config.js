const dotenv = require('dotenv');
const envFound = dotenv.config();

// if (envFound.error) {
//   throw new Error("Couldn't find .env file");
// }

module.exports = {
  version: process.env.APP_ROUTE_VERSION || 'v1',
};
