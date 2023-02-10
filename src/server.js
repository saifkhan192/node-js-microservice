const { app, startApp } = require('./app');
const { connectDbs } = require('./db');

if (require.main === module) { // if current file is the entry point
  connectDbs(app).then(startApp);
}

if (process.env.NODE_ENV === 'development') {
  const table = require('table');
  const allRoutes = require('express-list-endpoints')(app);
  const PORT = process.env.PORT || 8080;
  const base = `http://localhost:${PORT}`;

  const routeList = [];
  allRoutes.forEach((item, i) => {
    let middlewares = item.middlewares.filter(i => i != 'anonymous').join(', ');
    routeList.push([i + 1, base + item.path, item.methods.join(', '), middlewares])
  })
  console.log(table.table(routeList));
}

exports.app = app
