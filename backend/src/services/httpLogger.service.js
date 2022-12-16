const morgan = require('morgan');
const json = require('morgan-json');

const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  ip: ':remote-addr',
  date: ':date[iso]',
  agent: ':user-agent'
});

const logger = require('./logger.service.js');

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, url, status, ip, date, agent } = JSON.parse(message)
      logger.info('HTTP Log', {
        timestamp: date,
        method,
        url,
        ip,
        status: Number(status),
        agent
      })
    }
  }
})

module.exports = httpLogger;
