const express = require('express');
const cors = require('cors');
const { use } = require('express/lib/application');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users/';

        //middlewares
        this.middlewares();

        // routes
        this.routes();
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
            console.log('Server is running on port ', this.port);
        });
    }
}

module.exports = Server;