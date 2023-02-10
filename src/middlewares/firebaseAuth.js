const firebase = require("../firebase/admin");

const decodeJwtOAuth = async (req, res, next) => {
  req.locals = req.locals || {};
  req.locals.jwtToken = {};

  // Get Token from header and get the decoded Data
  let idToken = (req.headers.authorization || '').split(' ')[1];

  if (!idToken) {
    return
  }

  try {
    const tokenPayload = await firebase.auth().verifyIdToken(idToken)
    req.locals.jwtToken = tokenPayload;
    req.locals.authId = tokenPayload.uid;
  } catch (error) {
    console.log('[verifyIdToken:Error]', error.message)
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


