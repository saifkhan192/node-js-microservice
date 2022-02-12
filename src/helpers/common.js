const fs = require('fs');

exports.asyncLogToFile = (fileName, req, resData, statusCode = 200) => {
  let data = {
    request: {
      url: req.url,
      query: req.query,
      body: req.body,
      headers: req.headers
    },
    response: {
      status_code: statusCode,
      // content: JSON.stringify(resData)
      content: resData
    }
  }
  const logPath = process.env.LOG_PATH + '/' + fileName;
  data = JSON.stringify(data, null, 4);
  fs.appendFile(logPath, `${data}\n`, () => { })
}

exports.removeExtraHeaders = (headers) => {
  delete headers.connection;
  delete headers['cache-control'];
  delete headers['sec-ch-ua'];
  delete headers['user-agent'];
  delete headers.dnt;
  delete headers['upgrade-insecure-requests'];
  delete headers.accept;
  delete headers['sec-fetch-site'];
  delete headers['sec-fetch-mode'];
  delete headers['sec-fetch-user'];
  delete headers['sec-fetch-dest'];
  delete headers['accept-encoding'];
  delete headers['accept-language'];
  delete headers.cookie;
  delete headers['if-none-match'];
  delete headers['sec-ch-ua-mobile'];
  delete headers['postman-token'];
  delete headers.host;
  return headers;
};
