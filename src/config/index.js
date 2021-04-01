'use strict';
const path = require('path');

// require('dotenv').config({ path: '../', debug: true });


const defaults = {
    root: path.join(__dirname, '..'),
    mongoOptions: { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true },
};

let envName = process.env.NODE_ENV || 'development';

let envVars = require(defaults.root + '/env/' + envName);

module.exports = Object.assign({}, envVars, defaults);