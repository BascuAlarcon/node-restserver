const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error(`Rol ${role} has not registed in DB`);
    }
}

const mailExistence = async(mail = '') => {
    const mailExistence = await User.findOne({ mail });
    if( mailExistence){
        throw new Error('Mail has already registred');
    }
}

const userExistenceById = async(id = '') => { 
    const userExistence = await User.findById(id);  
    if( userExistence){
        throw new Error('Id doesnt exist');
    }
}

module.exports = {
    isValidRole,
    mailExistence,
    userExistenceById
}