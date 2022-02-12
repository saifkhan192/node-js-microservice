module.exports = (app) => {
  const router = require('express').Router();

  const servicesController = require('../controllers/servicesController');
  router.get('/services/joke', servicesController.getJokeAction);

  app.use('/', router)
}
