const notFoundHandler = (err, req, res, next) => {
  throw { status: 404, message: "Not found!" }
}

module.exports = notFoundHandler
