
// load env file ./src/.env.development
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('./config/index');
}

const express = require('express');
const favicon = require('serve-favicon');
const cors = require('cors')
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const requestLogger = require('./middlewares/requestLogger');
const { preloadJWTKeys } = require('./middlewares/jwtAuth');

const app = express();
app.use(cors())
app.use(bodyParser.json()); // parse content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse content-type - application/x-www-form-urlencoded
app.use(favicon('./public/favicon.ico'));
app.use(requestLogger)

// user routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome' });
});
app.use('/auth', require('./controllers/authControler'));
app.use('/user', require('./controllers/userController'));
app.use('/client', require('./controllers/clientController'));
app.use('/service', require('./controllers/servicesController'));
// app.use('/customer', require('./controllers/customerController'));

app.use(errorHandler)
app.use(notFoundHandler)

const startApp = async () => {
  await preloadJWTKeys();
  require('./repositories/index')(app);
  require('./models/index')(app);
  require('./models/mongoModels')(app);

  console.log('App Container:', Object.keys(app.locals));

  if (app.get('env') !== 'test') {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log('App is running: URL: http://localhost:' + PORT);
    });
  }
}

module.exports = { app, startApp };
