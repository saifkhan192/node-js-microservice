'use strict'

const config = require('../config/config')
const axiosBase = require('./axios');

exports.getApiInstance = () => {
  return axiosBase.createInstance({
    baseURL: 'http://localhost:8080',
    headers: {
      // 'Accept': 'application/json',
    },
    logFile: 'api.log'
  })
}

exports.getFreegeoipInstance = () => {
  return axiosBase.createInstance({
    baseURL: 'https://freegeoip.app',
    logFile: 'freegeoip.log'
  })
}

exports.getJokeApiInstance = () => {
  return axiosBase.createInstance({
    baseURL: 'https://v2.jokeapi.dev',
    logFile: 'jokes.log'
  })
}
