const axios = require('axios');
const fs = require('fs');

const asyncLogToFile = (fileName, logData) => {
  const logPath = process.env.LOG_PATH + '/' + fileName
  // fs.appendFile(logPath, JSON.stringify(logData) + '\n', () => {});
  fs.appendFile(logPath, JSON.stringify(logData, null, 4) + '\n', () => {})
  process.env.PRINT_API_CALLS && console.log(logData);
}

exports.createInstance = (params) => {
  const instance = axios.create(params)

  const logFile = params.logFile || 'api_calls.log'
  this.enableRequestLogging(instance, logFile)
  return instance
}

exports.enableRequestLogging = (instance, logFile) => {
  instance.interceptors.response.use(function (response) {
    // console.log(response.request.res.responseUrl);
    const logData = {
      request: {
        // url: response.config.url,
        url: response.request.res.responseUrl,
        method: response.config.method,
        payload: response.config.data || null,
        headers: response.config.headers,
        time: new Date()
      },
      response: {
        status_code: response.status,
        content: response.data
        // content: JSON.stringify(response.data)
      }
    }

    asyncLogToFile(logFile, logData)

    const result = {
      statusCode: response.status,
      data: response.data,
      statusText: response.statusText,
      errorText: null
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    return result
  }, function (error) {
    console.log(error)
    const response = error.response || {}
    const data = response.data && typeof response.data !== 'string' ? response.data : {}
    const logData = {
      request: {
        url: response.config.url,
        method: response.config.method,
        payload: response.config.data || null,
        headers: response.config.headers,
        time: new Date()
      },
      response: {
        status_code: response.status,
        content: JSON.stringify(data)
      }
    }

    asyncLogToFile(logFile, logData)

    const result = {
      statusCode: response.status,
      data: data,
      statusText: null,
      errorText: response.statusText
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(result)
  })
}
