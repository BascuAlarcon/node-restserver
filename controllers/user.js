const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user'); 

const getUsers = async(req, res = response) => {
     
    const {limit = 5, until = 0} = req.query;
 
    const [total, users] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({ state: true })
            .skip(Number(until))
            .limit(Number(limit))
    ]);

    res.json({ 
        total,
        users
    });
}

const postUsers = async(req, res = response) => { 
    const {name, mail, password, role} = req.body; 
    
    const user = new User({name, mail, password, role});
 
    // Password Encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save();

    res.json({ 
        msg: 'post API - Controller',
        user
    });
}

const deleteUsers = async(req, res = response) => {
    
    const { id } = req.params;
    
    // physic delete
    //const user = await User.findByIdAndDelete(id);

    // logic delete
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({ 
        user
    });
}

const putUsers = async (req, res = response) => {
    const id = req.params.id;  
    const {_id, password, google, mail, ...otherData } = req.body; 

    if(password){
        // Password Encrypt
        const salt = bcryptjs.genSaltSync();
        otherData.password = bcryptjs.hashSync(password, salt); 
    }

    const user = await User.findByIdAndUpdate(id, otherData);  

    res.json({ 
        msg: 'put  API - Controller',
        user
    });
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers
}