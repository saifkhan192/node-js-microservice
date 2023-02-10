const { logRequest } = require('../helpers/common')

const requestLogger = (req, res, next) => {
  res.sendJson = (respData) => {
    res.json(respData);
    logRequest(req, respData, res.statusCode)
  }
  next();
}

module.exports = requestLogger
