const mongo = require('mongodb');
const mysql = require('mysql2/promise');
const postgres = require('pg')
const config = require('./config/values');
const mongoose = require("mongoose");

const connectionArray = {
  dbMongo: config.dbMongo,
  dbPostgres: config.dbPostgres,
  dbMysql: config.dbMysql
}

const connectMysql = async (params) => {
  return mysql.createConnection(params);
}

const connectPostgres = async (params) => {
  const client = new postgres.Client(params)
  await client.connect()
  return client
}

const connectMongo = async (params) => {
  const conn = await mongoose.createConnection(params.mongoUri, params.mongoParams);
  return conn;
}

exports.connectDbs = async (app, callback) => {
  const promises = []
  const keys = []
  let loopIndex = 0

  for (const key in connectionArray) {
    const { type, ...params } = connectionArray[key];
    // console.log('params', params)
    if (type === 'mongo') { promises.push(connectMongo(params)); }
    if (type === 'mysql') { promises.push(connectMysql(params)); }
    if (type === 'postgres') { promises.push(connectPostgres(params)); }
    keys[loopIndex] = key;
    loopIndex++;
  }
  let result = await Promise.all(promises);

  const databases = {};
  result.map((dbInstance, loopIndex) => {
    const key = keys[loopIndex];
    databases[key] = dbInstance;
    console.log(`DB Connected  -  ${key}`);
  });

  app.locals.databases = databases;
  return true;
}

// For unit teting only
exports.closeDbs = async (app) => {
  const promises = [];
  for (const key in app.locals.databases) {
    const dbInstance = app.locals.databases[key];
    promises.push(dbInstance.close);
  }
  return Promise.all(promises);
};

// For unit teting only
exports.resetDbs = async (app) => {
  Object.entries(app.locals.databases).forEach(([key, db]) => {
    if (db.constructor.name === 'Db') {
      db.dropDatabase();
    }
  });
};
