const { response } = require('express');


const getUsers = (req, res = response) => {
    
    const { query, nombre = 'No name', page = 1, key } = req.query;

    res.json({ 
        msg: 'get API - Controller',
        key
    });
}

const postUsers = (req, res = response) => {
    const {name, age} = req.body; 
    res.json({ 
        msg: 'post API - Controller',
        name
    });
}

const deleteUsers = (req, res = response) => {
    res.json({ 
        msg: 'delete API - Controller'
    });
}

const putUsers = (req, res = response) => {
    const id = req.params.id;  
    res.json({ 
        msg: 'put  API - Controller',
        id
    });
}

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers
}