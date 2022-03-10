const { response } = require("express");
const {ObjectId} = require('mongoose').Types;

const {User, Category, Product} = require('../models');

const colectionEnabled = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUser = async(term = '', res = response) =>{
    const isMongoId = ObjectId.isValid(term);
    if(isMongoId){
        const user = await User.findById(term);
        res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{name: regex}, {mail: regex}],
        $and: [{state: true}]
    });
    const number = await User.countDocuments({
        $or: [{name: regex}, {mail: regex}],
        $and: [{state: true}]
    });

    res.json({
        Number: number,
        results: users
    });

}

const searchCategory = async(term = '', res = response) =>{
    const isMongoId = ObjectId.isValid(term);
    if(isMongoId){
        const category = await Category.findById(term);
        res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const categories = await Category.find({name: regex, state: true}); 

    res.json({ 
        results: categories
    }); 
}

const searchProduct = async(term = '', res = response) =>{
    const isMongoId = ObjectId.isValid(term);
    if(isMongoId){
        const product = await Product.findById(term).populate('category', 'name');
        res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({name: regex, state: true}).populate('category', 'name'); 

    res.json({ 
        results: products
    }); 
}

const search = (req, res = response) => { 
    const { colection, term } = req.params;
    
    if(!colectionEnabled.includes(colection)){
        return res.status(400).json({
            msg: `Colection enabled are: ${colectionEnabled}`
        });
    }

    switch (colection) {
        case 'users': 
        searchUser(term, res);
        break;
        case 'category': 
        searchCategory(term, res);
        break;
        case 'products': 
        searchProduct(term, res);
        
        break; 
        default:
            res.status(500).json({
                msg: 'Search feature are not working'
            });
    } 
}

module.exports = {
    search
}