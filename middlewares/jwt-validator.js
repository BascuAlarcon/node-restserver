const { request, response } = require('express'); 
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'There is not token in petition'
        });
    }
    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        req.user = await User.findById(uid);
        
        if(!req.user){  
            return res.status(401).json({
                msg: 'Token invalid'
            });
        }

        // User state verify
        if(!req.user.state){ 
            return res.status(401).json({
                msg: 'Token invalid'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token invalid'
        });
    }

}

module.exports = {validateJWT}