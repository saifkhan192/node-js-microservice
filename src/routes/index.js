/**
 * @param {import('../app').ExpressApp} app
 */
module.exports = app => {
  require('./userRoutes')(app)
  require('./customerRoutes')(app)
  require('./servicesRoutes')(app)

  // 404 errors, This should be the last route of the application
  app.use((req, resp, next) => {
    resp.sendError(
      404,
      { message: 'Route (' + req.url + ') not found.' },
      ['This is 404 error handler']
    );
  })
}
