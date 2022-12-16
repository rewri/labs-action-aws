const basicAuth = require('express-basic-auth');
const config = require('../configs/index.config.js');

const apiKey = config.app_key || null;

const authMiddleware = basicAuth({
  users: { apiKey },
  unauthorizedResponse: {
    error: "Unauthorized",
    httpStatus: 401,
  },
  challenge: false
});

module.exports = authMiddleware;
