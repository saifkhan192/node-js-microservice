const UserRepository = require("./UserRepository");
const ClientRepository = require("./ClientRepository");

module.exports = (app) => {
  let databases = app.locals.databases;
  app.locals.userRepository = new UserRepository(databases.dbPostgres);
  app.locals.clientRepository = new ClientRepository(databases.dbMysql);
};
