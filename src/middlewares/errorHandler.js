const { axiosError } = require("../services");

const errorHandler = (err, req, res, next) => {
  let stack = err.stack || '';
  let status = err.status || 500;
  let message = err.message;

  console.error('ERROR:', err.name, message, stack)

  if (err._message) { // mongoose model validation errors
    status = 400;
  }

  if (err.name === 'MongoError') { // mongoose query errors
    status = 400;
  }

  if (err.isAxiosError) {
    console.log("Axios Error:", axiosError(err));
  }

  if (res.headersSent) {
    return next(err);
  }

  res.status(status).sendJson({ error: message })
}

module.exports = errorHandler
