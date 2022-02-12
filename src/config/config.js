const envs = process.env
module.exports = {
  dbMain: {
    type: 'mongo',
    mongo_uri: envs.COMMON_MONGODB_URL,
    mongo_db_name: envs.COMMON_MONGODB_DB_NAME,
    mongo_params: { useUnifiedTopology: true },
    is_main_db: true
  },
  dbStats: {
    type: 'mongo',
    mongo_uri: envs.COMMON_MONGODB_URL,
    mongo_db_name: envs.STATS_MONGODB_DB_NAME,
    mongo_params: { useUnifiedTopology: true }
  },
  mysqlDbMain: {
    type: 'mysql',
    host: envs.MYSQL_DB_HOST,
    user: envs.MYSQL_DB_USER,
    password: envs.MYSQL_DB_PASSWORD,
    database: envs.MYSQL_DB_NAME
  },

  checkoutPublicKey: envs.CHECKOUT_PUBLIC_KEY,
  checkoutSecretKey: envs.CHECKOUT_SECRET_KEY,
  redis_url: envs.REDIS_URL
}
