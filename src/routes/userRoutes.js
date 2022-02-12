
module.exports = (app) => {
  const userControler = require('../controllers/userController');
  const router = require('express').Router();

  router.get('/user/get', userControler.getUserAction);
  router.get('/user/error', userControler.someErrorAction);

  app.use('/', router);
}
