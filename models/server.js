const express = require('express');
const cors = require('cors');
const { use } = require('express/lib/application');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users/';

        // connection to DB
        this.connectionDB();

        //middlewares
        this.middlewares();

        // routes
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // JSON PARSE
        this.app.use(express.json());
    
        // public directory
        this.app.use(express.static('public'));
    }

    routes(){ 
        this.app.use(this.usersPath, require('../routes/user')); 
    }

    listen(){ 
        this.app.listen(this.port, () => {
            console.log('\nServer is running on port ', this.port);
        });
    }
}

module.exports = Server;