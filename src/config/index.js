const path = require('path');
const rootPath = path.join(__dirname, '..');

const envPath = `${rootPath}/${process.env.NODE_ENV}.env`;
require('dotenv').config({ path: envPath });

console.log(`ENV loaded: ${envPath}`)

