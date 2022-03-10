const { response } = require("express")
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { JWTGenerate } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");


const login = async(req, res = response) => {

    const { mail, password } = req.body;

    try {

        // verify mail existence
        const user = await User.findOne({mail});
        if(!user){
            return res.status(400).json({
                msg: 'Credentials are wrong!'
            });
        }

        // user status
        if(user.status = false){
            return res.status(400).json({
                msg: 'User unnabled'
            });
        }

        // verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Credentials are wrong!'
            });
        }

        // JWT generate
        const token = await JWTGenerate(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Something has failed'
        });
    } 
} 

const googleSignIn = async(req, res = response) => {
    const {id_token} = req.body; 
    try {
        const {name, img, mail} = await googleVerify(id_token);
         
        let user = await User.findOne({mail}); 
        if(!user){
            // if the user doesn't exist, we're gonna create his account
            const data = {
                name,
                mail,
                password: 'PW',
                img,
                role: 'USER_ROLE',
                google: true
            }; 
            user = new User(data);  
            await user.save(); 
        } 
        // verify user state
        if(!user.state){
            return res.status(401).json({
                msg: 'User disables'
            });
        }

        const token = await JWTGenerate(user.id); 
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}