const { Router } = require('express');
const { check } = require('express-validator');

const {fieldValidator, validateJWT, isAdminRol, hadRole} = require('../middlewares');

const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/user');
const { isValidRole, mailExistence, userExistenceById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.put('/:id', [
    check('_id', 'ID Invalid').isMongoId(),
    check('id').custom(userExistenceById),
    check('role').custom(isValidRole),
    fieldValidator,
],  putUsers);

router.post('/', [
    check('mail', 'Mail had a wrong format').isEmail(),
    check('mail').custom(mailExistence),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password required at least 6 characters').isLength({ min: 6}), 
    check('role').custom(isValidRole),
    fieldValidator
], postUsers); 

router.delete('/:id', [
    validateJWT,
    // isAdminRol,
    hadRole('ADMIN_ROLE', 'USER_ROLE'),
    check('_id', 'ID Invalid').isMongoId(),
    check('_id').custom(userExistenceById),
    fieldValidator
], deleteUsers); 

module.exports = router;