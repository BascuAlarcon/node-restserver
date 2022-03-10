const { Category, User, Role, Product } = require('../models'); 

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
    if( !userExistence){
        throw new Error('Id doesnt exist');
    }
}

const categoryExistenceById = async(id = '') => { 
    const categoryExistence = await Category.findById(id);  
    if( !categoryExistence){
        throw new Error('Id doesnt exist');
    }
}

const productExistenceById = async(id = '') => { 
    const productExistence = await Product.findById(id);  
    if( !productExistence){
        throw new Error('Id doesnt exist');
    }
}

const allowedCollection = (collection = '', collections = []) => {
    const ifIncluded = collections.includes(collection);
    if(!ifIncluded){
        throw new Error(`Colection ${collection} are not allowed. Must be ${collections}`);
    }
    return true;
}

module.exports = {
    isValidRole,
    mailExistence,
    userExistenceById,
    categoryExistenceById,
    productExistenceById,
    allowedCollection
}