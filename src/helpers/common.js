exports.logRequest = (req, respData, statusCode) => {
  let data = {
    request: {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      body: req.body,
      headers: removeExtraHeaders(req.headers)
    },
    response: {
      statusCode: statusCode,
      content: respData
    }
  }
  console.log(data)
}

const removeExtraHeaders = (headers) => {
  delete headers.connection;
  delete headers['content-length'];
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
  delete headers['sec-ch-ua-platform'];
  delete headers.host;
  // delete headers['authorization'];
  delete headers['origin'];
  delete headers['referer'];
  return headers;
};
