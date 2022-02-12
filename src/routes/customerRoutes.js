module.exports = (app) => {
  const router = require('express').Router();

  const customerController = require('../controllers/customerController');

  router.get('/customer/mysql', customerController.getCustomerMysqlAction);
  router.get('/customer/mongo', customerController.getCustomerMongoAction);
  app.use('/', router)
}
