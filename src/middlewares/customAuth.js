const jwt = require("jsonwebtoken");

const decodeJwtOAuth = async (req, res, next) => {
  req.locals = req.locals || {};
  req.locals.jwtToken = {};

  let authToken = (req.headers.authorization || '').split(' ')[1];

  if (!authToken) {
    return
  }

  try {
    const tokenPayload = await jwt.verify(authToken, process.env.API_SECRET);
    // console.log('tokenPayload', tokenPayload)
    req.locals.jwtToken = tokenPayload;
    req.locals.authId = tokenPayload.authId;
  } catch (error) {
    console.log('[jwt.verify] [Error]', error.message)
  }
}

const OAuthRequired = async (req, res, next) => {
  await decodeJwtOAuth(req, res, next);
  if (!req.locals?.authId) {
    return res.status(401).sendJson({ error: 'Not Authorized' });
  }
  next();
};


const resolveUser = async (req, res, next) => {
  if (req.locals?.authId) {

    // resolve from db
    let user = {
      userId: '1',
      name: 'Saifullah Khan',
      address: 'LHR',
    }

    req.locals.user = user;
  } else {
    throw { message: 'Cannot resolve user', status: 401 }
  }

  next();
};

const preloadJWTKeys = async (req, res, next) => { };

module.exports.OAuthRequired = OAuthRequired;
module.exports.preloadJWTKeys = preloadJWTKeys;
module.exports.resolveUser = resolveUser;
