const { asyncHandler } = require('./asyncHandler');
// const { OAuthRequired, preloadJWTKeys, resolveUser } = require('./firebaseAuth')
// const { OAuthRequired, preloadJWTKeys, resolveUser } = require('./cognitoAuth')
const { OAuthRequired, preloadJWTKeys, resolveUser } = require('./customAuth')

module.exports.OAuthRequired = OAuthRequired;
module.exports.preloadJWTKeys = preloadJWTKeys;
module.exports.resolveUser = asyncHandler(resolveUser);


