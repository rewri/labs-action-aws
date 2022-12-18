const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const logger = require('./services/logger.service.js');
const config = require('./configs/index.config.js');
const httpLogger = require('./services/httpLogger.service.js');
const errorHelper = require('./helpers/error.helper.js');
const authMiddleware = require('./services/auth.service.js');

app.use(httpLogger);
//app.use(authMiddleware);

const routes = require('./routes/router.routes.js');
routes.forEach(({ route, router }) => {
  app.use(route, router)
});

app.use((err, req, res, next) => {
  const error = { "statusText": "failure", "error": err.message };
  //if (config.node_env == 'development') {
  error["stack"] = err.stack;
  //}
  res.status(err.status || 500).json(error);
  logger.error({
    agent: req.get('User-Agent'),
    ip: req.ip,
    level: "error",
    message: err.message,
    method: req.method,
    status: err.status || Number(res.statusCode),
    timestamp: new Date(),
    url: req.baseUrl || req.originalUrl,
    stackTrace: err.stack
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'not found' });
});

module.exports = { app }
