module.exports = {

  formatError(req, res, next) {
    return {
      agent: req.get('User-Agent'),
      ip: req.ip,
      level: "error",
      message: err.message,
      method: req.method,
      status: err.status || Number(res.statusCode) || 500,
      timestamp: new Date(),
      url: req.baseUrl || req.originalUrl,
      stackTrace: err.stack
    }
  }

}
