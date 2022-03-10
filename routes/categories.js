const { Router } = require('express');
const { check } = require('express-validator'); 
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { categoryExistenceById } = require('../helpers/db-validators');
const { isAdminRol } = require('../middlewares');
const { fieldValidator } = require('../middlewares/field-validator');

const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

// {{url}}/api/categories

// get all categories - public
router.get('/', [
    check('id').custom( categoryExistenceById),
    ], getCategories);

// Get one category - public
router.get('/:id', [
    check('id', 'Is not a mongo Id').isMongoId(),
    check('id').custom( categoryExistenceById),
    fieldValidator
    ], getCategory);

// Create category - token required
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidator  
    ], createCategory);

// Update category - token required
router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom( categoryExistenceById ),
    fieldValidator
    ], updateCategory);

// Delete category - only role administrator
router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'Is not a mongo Id').isMongoId(),
    check('id').custom( categoryExistenceById ),
    fieldValidator
    ], deleteCategory);


module.exports = router;  