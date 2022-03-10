
const fieldValidator = require('../middlewares/field-validator');
const validateJWT = require('../middlewares/jwt-validator');
const roleValidator = require('../middlewares/role-validator');
const fileValidator = require('../middlewares/file-validator');

module.exports = {
    ...fieldValidator, 
    ...validateJWT,
    ...roleValidator,
    ...fileValidator
}