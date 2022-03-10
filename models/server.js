const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth/',
            users:      '/api/users/',
            categories: '/api/categories/',
            products: '/api/products/',
            search: '/api/search/',
            uploads: '/api/uploads/'
        } 

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

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp',
            createParentPath: true // be careful: if the folder doesnt exist, will be create
        }));
    }

    routes(){ 
        this.app.use(this.paths.auth, require('../routes/auth'));  
        this.app.use(this.paths.users, require('../routes/users')); 
        this.app.use(this.paths.categories, require('../routes/categories')); 
        this.app.use(this.paths.products, require('../routes/products')); 
        this.app.use(this.paths.search, require('../routes/search')); 
        this.app.use(this.paths.uploads, require('../routes/uploads')); 
    }

    listen(){ 
        this.app.listen(this.port, () => {
            console.log('\nServer is running on port ', this.port);
        });
    }
}

module.exports = Server;