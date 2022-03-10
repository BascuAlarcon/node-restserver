const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage, getImg, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollection } = require('../helpers');

const { fieldValidator, fileValidator } = require('../middlewares');

const router = Router();

router.post('/', fileValidator, uploadFile);

router.put('/:collection/:id', [
    fileValidator,
    check('id', 'Id is not valid').isMongoId(),
    check('collection').custom( c => allowedCollection(c, ['users', 'products'])),
    fieldValidator,
], updateImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('collection').custom( c => allowedCollection(c, ['users', 'products'])),
    fieldValidator,
],  getImg);

module.exports = router;  