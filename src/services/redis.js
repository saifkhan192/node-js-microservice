const config = require('./config/config')

const redis = require('redis')
// const { promisify } = require('util')
const redisClient = redis.createClient(config.redis_url)

redisClient.on('error', (err) => {
  console.log('redisClient error: ')
  console.log(err)
})

// Let value = 'saif';
// // redisClient.set("missing_key", JSON.stringify(value), function(err, reply) {
// //     // reply is null when the key is missing
// //     console.log(err, reply);
// // });
// RedisClient.get("missing_key", function(err, reply) {
//     // reply is null when the key is missing
//     Console.log(err, reply);
// });

/*
 * RedisClient.get("missing_key", function(err, reply) {
 *     // reply is null when the key is missing
 *     console.log(err, reply);
 * });
 */

// RedisClient.getAsync(key);

/*
 * Module.exports = {
 *     ...client,
 *     getAsync: promisify(client.get).bind(client),
 *     setAsync: promisify(client.set).bind(client),
 *     keysAsync: promisify(client.keys).bind(client)
 * };
 */
