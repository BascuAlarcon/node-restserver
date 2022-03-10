const { response }  = require('express');
const path          = require('path');
const fs            = require('fs');
const cloudinary    = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const {uploadFiles}     = require('../helpers/');
const {User, Product}   = require('../models');

const uploadFile = async(req, res = response) => {   
  try {
    // if you wanna use the default values of the params, send the value 'undefined'
    const name = await uploadFiles(req.files, ['txt', 'md', 'png'], 'users');
    res.json({name});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

const updateImage = async(req, res = response) => {  
  const {id, collection} = req.params;

  let model;
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({msg: `There no User with id ${id}`});
      }     
      break;
    case 'products':
        model = await Product.findById(id); 
        if(!model){
          return res.status(400).json({msg: `There no Product with id ${id}`});
        }     
        break;
    default:
      return res.status(500).json({msg: 'xD'});
  } 

  // clear the images that already exist
  if(model.img){
    const pathImage = path.join(__dirname, '../uploads', collection, model.img); 
    if(fs.existsSync(pathImage)){ 
      fs.unlinkSync(pathImage);
    }
  }

  const name = await uploadFiles(req.files, undefined, collection);
  model.img = name;
  await model.save();

  res.json({
    model
  });
}

const updateImageCloudinary = async(req, res = response) => {  
  const {id, collection} = req.params;

  let model;
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({msg: `There no User with id ${id}`});
      }     
      break;
    case 'products':
        model = await Product.findById(id); 
        if(!model){
          return res.status(400).json({msg: `There no Product with id ${id}`});
        }     
        break;
    default:
      return res.status(500).json({msg: 'xD'});
  } 

  // clear the images that already exist
  if(model.img){
    const nameArr     = model.img.split('/'); 
    const name        = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  // save in cloudinary
  const {tempFilePath} = req.files.file; 
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
 
  // save in db
  model.img = secure_url;
  await model.save();

  res.json(model);
}

const getImg = async(req, res = response) => {
  const {id, collection} = req.params;

  let model;
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({msg: `There no User with id ${id}`});
      }     
      break;
    case 'products':
        model = await Product.findById(id); 
        if(!model){
          return res.status(400).json({msg: `There no Product with id ${id}`});
        }     
        break;
    default:
      return res.status(500).json({msg: 'xD'});
  } 

  // clear the images that already exist
  if(model.img){
    const pathImage = path.join(__dirname, '../uploads', collection, model.img); 
    if(fs.existsSync(pathImage)){ 
      return res.sendFile(pathImage);
    }
  }
  const pathImage = path.join(__dirname, '../assets/no-image.jpg'); 
  return res.sendFile(pathImage);
}

module.exports = {
    uploadFile, updateImage, getImg, updateImageCloudinary
}