const { response } = require("express")


const isAdminRol = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Error validating role: role-validator.js | line: 8'
        });
    }
    const { role, name } = req.user;
    if(role !== 'ADMIN_ROLE'){
        return res.status(404).json({
            msg: 'Unauthorized'
        });
    }

    next();
}

const hadRole = ( ...roles ) => {
    return (req, res = response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Error validating role: role-validator.js | line: 8'
            });
        }
        if(roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: 'Unauhorized'
            });
        }

        next();
    }
}

module.exports = { isAdminRol, hadRole }