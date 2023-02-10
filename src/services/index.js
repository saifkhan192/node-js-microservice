const axios = require('axios');
// const config = require('../config/values')

/** @type {import('axios').AxiosInstance} jokesService */
exports.jokesService = axios.create({
  baseURL: 'https://v2.jokeapi.dev',
});

/** @type {import('axios').AxiosInstance} apiService */
exports.apiService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

// https://axios-http.com/docs/handling_errors
exports.axiosError = (error) => {
  let result = {};
  if (error.response) {
    result = {
      statusCode: error.response.status,
      error: error.response.data,
    };
  } else {
    result = {
      statusCode: null,
      error: error.message
    };
  }
  let log = result;
  if (error.config) {
    log = {
      method: error.config.method,
      url: `${error.config.baseURL}${error.config.url}`,
      params: error.config.params,
      payload: error.config.data ? JSON.parse(error.config.data) : {},
      result: result,
    };
  }
  return JSON.stringify(log, null, 4);
};
