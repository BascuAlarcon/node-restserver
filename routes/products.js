const { Router } = require('express');
const { check } = require('express-validator'); 
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { productExistenceById, categoryExistenceById } = require('../helpers/db-validators');
const { isAdminRol } = require('../middlewares');
const { fieldValidator } = require('../middlewares/field-validator');

const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

// {{url}}/api/products

// get all products - public
router.get('/', getProducts);

// Get one products - public
router.get('/:id', [
    check('id', 'Is not a mongo Id').isMongoId(),
    check('id').custom( productExistenceById),
    fieldValidator
    ], getProduct);

// Create category - token required
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId(),
    check('category').custom( categoryExistenceById ),
    fieldValidator  
    ], createProduct);

// Update products - token required
router.put('/:id', [
    validateJWT, 
    // check('id', 'Is not a mongo Id').isMongoId(),
    check('id').custom( productExistenceById ),
    fieldValidator
    ], updateProduct);

// Delete products - only role administrator
router.delete('/:id', [
    validateJWT,
    isAdminRol,
    check('id', 'Is not a mongo Id').isMongoId(),
    check('id').custom( productExistenceById ),
    fieldValidator
    ], deleteProduct);


module.exports = router;  