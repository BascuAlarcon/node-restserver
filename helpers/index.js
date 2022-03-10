

const dbValidators  = require('./db-validators');
const googleVerify  = require('./google-verify');
const generateJWT   = require('./generateJWT');
const uploadFile    = require('./upload-file');


module.exports = {
    ...dbValidators,
    ...googleVerify,
    ...generateJWT,
    ...uploadFile
}