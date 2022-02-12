'use strict'

// const validator = require('./services/validator');

/**
 * @typedef Locals
 * @property {} databases
 */

/**
 * @typedef ExpressApp
 * @property {Locals} locals
 */

/** @type {ExpressApp} expressApp */
const expressApp = require('express')();

// Configs / Envs
require('./config/index')

// Middlewares
require('./middlewares/index')(expressApp)

// Services
require('./services/index')

// Routes / Controllers
require('./routes/index')(expressApp)

expressApp.startApp = () => {
  require('./repositories/index')(expressApp);
  require('./models/index')(expressApp);
  if (expressApp.get('env') !== 'test') {
    const PORT = process.env.PORT || 8080;
    expressApp.listen(PORT, () => {
      console.log('Application is running: open: http://localhost:' + PORT);
      console.log(new Date());
    });
  }
}

expressApp.getDependency = (key) => {
  if (expressApp.locals[key] === undefined) {
    const available = Object.keys(expressApp.locals).join('\n') + '\n';
    throw Error(key + ' is not defined in container, use from below:\n' + available);
  }
  return expressApp.locals[key];
}

module.exports = expressApp;
