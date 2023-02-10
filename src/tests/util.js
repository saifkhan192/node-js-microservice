const { app, startApp } = require('../app');
const database = require('../db');

let setupApp = async () => {
  await database.connectDbs(app);
  // await database.resetDbs(app);
  await startApp();
};

let destroyApp = async () => {
  await database.closeDbs(app);
};

module.exports = { setupApp, destroyApp }