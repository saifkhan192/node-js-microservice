const path = require('path');
const rootPath = path.join(__dirname, '..');

if (process.env.NODE_ENV !== 'production') {
  const envPath = `${rootPath}/.env.${process.env.NODE_ENV}`;
  const result = require('dotenv').config({ path: envPath });
  if (result.error) {
    throw result.error
  }
}
