const { MongoClient, Logger } = require('mongodb');
const mysql = require('mysql2/promise');

const config = require('./config/config');

const connectionArray = {
  dbMain: config.dbMain,
  dbStats: config.dbStats,
  mysqlDbMain: config.mysqlDbMain
}

function connectMongo (key, conf) {
  delete conf.type;
  return MongoClient.connect(conf.mongo_uri, conf.mongo_params).then((client) => client.db(conf.mongo_db_name));
}

function connectMysql (key, conf) {
  delete conf.type;
  return mysql.createConnection(conf);
}

exports.connectDbs = async (expressApp, callback) => {
  const promises = []
  const keys = []
  let loopIndex = 0

  if (process.env.MONGO_DEBUG) {
    // Logger.setLevel('debug');
    // Logger.filter('class', ['Db', 'Cursor']);
    // Set our own logger
    // Logger.setCurrentLogger(function (msg, context) {
    //   console.log(context.message);
    //   console.log(context.className);
    // });
  }

  for (const key in connectionArray) {
    const conf = connectionArray[key];
    if (conf.type === 'mongo') { promises.push(connectMongo(key, conf)); }
    if (conf.type === 'mysql') { promises.push(connectMysql(key, conf)); }
    keys[loopIndex] = key;
    loopIndex++;
  }

  await Promise.all(promises).then(dbsArray => {
    const databases = {};
    dbsArray.map((dbInstance, loopIndex) => {
      const key = keys[loopIndex];
      databases[key] = dbInstance;
      // console.log(`DB Connected  -  ${key}`);
    });
    expressApp.locals.databases = databases;
  })
}

exports.closeDbs = async (expressApp) => {
  const promises = [];
  for (const key in expressApp.locals.databases) {
    const dbInstance = expressApp.locals.databases[key];
    promises.push(dbInstance.close);
  }
  return Promise.all(promises);
};

exports.resetDbs = async (expressApp) => {
  Object.entries(expressApp.locals.databases).forEach(([key, db]) => {
    if (db.constructor.name === 'Db') {
      db.dropDatabase();
    }
  });
};
