const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/login', [
    check('mail', 'Mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
], login);
router.post('/google', [
    check('id_token', 'Google Token (id_token) is required').not().isEmail(), 
    fieldValidator
], googleSignIn);


module.exports = router;  