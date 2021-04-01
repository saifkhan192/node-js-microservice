'use strict';

module.exports = {
    mongo_uri: process.env.MONGODB_URL || 'mongodb://mongodb:27017',
    mongo_db_name: process.env.MONGODB_DB_NAME || 'dev_db',
};