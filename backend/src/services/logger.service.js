const appRoot = require('app-root-path');
const winston = require('winston');
const { combine, printf } = winston.format;
const config = require('../configs/index.config.js');

const customLogFormat = printf(({ message }) => message);
const logger = winston.createLogger({});

logger.add(new winston.transports.File({
  level: 'error',
  filename: `${appRoot}/logs/${config.log.error_file}`,
  handleExceptions: true,
  json: true,
  maxsize: config.max_file_size,
  maxFiles: config.max_files,
  colorize: false,
  format: combine(customLogFormat)
}));

logger.add(new winston.transports.File({
  level: 'info',
  filename: `${appRoot}/logs/${config.log.info_file}`,
  handleExceptions: true,
  json: true,
  maxsize: config.max_file_size,
  maxFiles: config.max_files,
  colorize: false
}));

module.exports = logger;
