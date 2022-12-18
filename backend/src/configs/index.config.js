const dotenv = require('dotenv');

module.exports = {
  node_env: process.env.NODE_ENV || 'development',
  app_name: process.env.APP_NAME,
  app_port: process.env.API_PORT || 3020,
  app_key: process.env.APP_KEY,
  app_version: process.env.APP_VERSION || '1.0.0',
  log: {
    level: process.env.LOG_LEVEL || 'silly',
    error_file: process.env.LOG_FILE_ERROR || 'error.log',
    info_file: process.env.LOG_FILE_INFO || 'info.log',
    app_file: process.env.LOG_FILE_APP || 'app.log',
    sql_file: process.env.LOG_FILE_SQL || 'sql.log',
    max_file_size: process.env.LOG_FILE_MAX_SIZE || 5242880,
    max_files: process.env.LOG_FILE_MAX_FILES || 5,
  },

};
