'use strict'

const expressApp = require('./app');
const { connectDbs } = require('./db');

// Databases
if (module.parent === null) {
  connectDbs(expressApp).then(expressApp.startApp);
}

exports.app = expressApp
