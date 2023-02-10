
// https://github.com/awslabs/aws-jwt-verify#express
// Create the verifier outside your route handlers,
// so the cache is persisted and can be shared amongst them.

const { CognitoJwtVerifier } = require('aws-jwt-verify');

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID || "<userPoolId>",
  clientId: process.env.COGNITO_CLIENT_ID || "<clientId>",
  tokenUse: "id", // "id" FOR idToken, and "access" for accessToken
});

const decodeJwtOAuth = async (req, res, next) => {
  req.locals = req.locals || {};
  req.locals.jwtToken = {};

  // Get Token from header and get the decoded Data
  let idToken = (req.headers.authorization || '').split(' ')[1];

  if (!idToken) {
    return
  }

  try {
    const tokenPayload = await jwtVerifier.verify(idToken);
    req.locals.jwtToken = tokenPayload;
    req.locals.authId = tokenPayload.sub;
  } catch (error) {
    console.log('[jwtVerifier:Error]', error.message)
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


// Hydrating the verifier makes sure the JWKS is loaded
// so it can verify JWTs immediately without any latency.
const preloadJWTKeys = async (req, res, next) => {
  await jwtVerifier.hydrate();
};

module.exports.OAuthRequired = OAuthRequired;
module.exports.preloadJWTKeys = preloadJWTKeys;
module.exports.resolveUser = asyncHandler(resolveUser);



