const envs = process.env

let config = {
  dbMongo: {
    type: 'mongo',
    mongoUri: envs.COMMON_MONGODB_URL,
    mongoDbName: envs.COMMON_MONGODB_DB_NAME,
    mongoParams: { useUnifiedTopology: true },
  },
  dbMysql: {
    type: 'mysql',
    host: envs.MYSQL_DB_HOST,
    user: envs.MYSQL_DB_USER,
    password: envs.MYSQL_DB_PASSWORD,
    database: envs.MYSQL_DB_NAME,
    // dateStrings: true
  },
  dbPostgres: {
    type: 'postgres',
    host: envs.POSTGRES_DB_HOST,
    port: 5432,
    user: envs.POSTGRES_DB_USER,
    password: envs.POSTGRES_DB_PASSWORD,
    database: envs.POSTGRES_DB_NAME
  },
  checkoutPublicKey: envs.CHECKOUT_PUBLIC_KEY,
  checkoutSecretKey: envs.CHECKOUT_SECRET_KEY,
  redisUrl: envs.REDIS_URL
}

module.exports = config