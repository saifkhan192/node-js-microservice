// @ts-check

const bodyParser = require('body-parser');
// const fs = require('fs');
const favicon = require('serve-favicon');
// const path = require('path');
const express = require('express');
const { removeExtraHeaders, asyncLogToFile } = require('../helpers/common')

module.exports = (app) => {
  // https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use

  // Handy function to send response and log to file

  app.use((req, res, next) => {
    req.headers = removeExtraHeaders(req.headers);

    res.sendJson = (data) => {
      asyncLogToFile('access.log', req, data)
      res.status(200).json(data);
    }

    /**
     * @param {express.Request & {sendError : Function, specialParam3 : any}} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    res.sendError = (statusCode, error, data) => {
      console.log(statusCode, error, data);
      const log = {
        date: new Date(),
        error: error.message,
        stack: error.stack,
        response: data
      };
      asyncLogToFile('errors.log', req, log, statusCode)
      res.status(statusCode).json(data);
    }
    next()
  })

  // Parse application/json
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // app.set('view engine', 'pug');
  app.set('views', './client/public');

  // app.set('views', './src/views');

  // Send favicon
  app.use(favicon('./public/favicon.ico'));

  // Serve static files for react page
  app.use('/public', express.static('client/public'));

  // app.get('/react', function (req, res) {
  //   res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  // });
}
