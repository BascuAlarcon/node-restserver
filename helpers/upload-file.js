const path = require('path');
const {v4: uuidv4} = require('uuid');

const uploadFiles = (files, validExtension = ['jpg', 'png', 'jpeg', 'gif'], folder = '') => { 
    return new Promise((resolve, reject) => { 
        const {file} = files;
        const name = file.name.split('.');
        const fileExtension = name[name.length - 1];
    
        // validate extension
        const extensionsValidate =  validExtension;
        if(!extensionsValidate.includes(fileExtension)){
            return reject(`Extension ${fileExtension} is not permited. File must be ${extensionsValidate}`); 
        }
    
        const tempName = uuidv4() + '.' + fileExtension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);  
    
        file.mv(uploadPath, (err) => {
          if (err) {
            console.log(err);
            return reject(err); 
          } 
          resolve(tempName);
        });
    }); 
}


module.exports = {uploadFiles}