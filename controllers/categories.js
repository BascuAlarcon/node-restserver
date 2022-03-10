const { response } = require("express");

const {Category} = require('../models');

const getCategories = async(req, res = response) => {
    const {limit = 5, until = 0} = req.query;
    const query = {state: true}
 
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find({ state: true })
            .populate('user', 'name')
            .skip(Number(until))
            .limit(Number(limit))
    ]);

    res.json({ 
        total,
        categories
    });
}

const getCategory = async(req, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);
}

const createCategory = async(req, res = response) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({name});
    
    // verify if exist
    if(categoryDB){
        return res.status(400).json({
            msg: `Category ${categoryDB.name} already exist`
        });
    }

    // Generate Data to save
    const data = {
        name,
        user: req.user._id
    }
 
    // save in DB
    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
}

const updateCategory = async(req, res = response) => {
    const {id} = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});
    res.json(category);
}

const deleteCategory = async(req, res = response) => {
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});

    res.json(category);
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}