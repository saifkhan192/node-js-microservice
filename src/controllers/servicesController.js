const { asyncHandler } = require('../middlewares/asyncHandler')
const services = require('../services/index');
const router = require('express').Router();

router.get('/jokes', asyncHandler(async (req, res) => {
  let jokes = await services.jokesService.get('/joke/Programming');
  res.status(200).sendJson(jokes.data);
}));

router.get('/users', asyncHandler(async (req, res) => {
  let users = await services.apiService.get('/users')
  res.status(200).sendJson(users.data);
}));

router.get('/users-with-error', asyncHandler(async (req, res) => {
  let users = await services.apiService.get('/users-404-url')
  res.status(200).sendJson(users.data);
}));

router.get('/some-error', asyncHandler(async (req, res) => {
  throw { status: 400, message: "Custom error here" };
}));

module.exports = router;
