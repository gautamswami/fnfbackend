const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dk7vwmblr', 
  api_key: '621491742985526', 
  api_secret: 'L2sQ91mVK9YFRi20lIXctJ7nbQg' 
});

module.exports = cloudinary;