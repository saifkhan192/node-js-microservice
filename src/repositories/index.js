const CustomerRepository = require('./CustomerRepository');
const UserRepository = require('./UserRepository');

module.exports = (app) => {
  app.locals.customerRepository = new CustomerRepository(app.locals.databases)
  app.locals.userRepository = new UserRepository(app.locals.databases)
}
