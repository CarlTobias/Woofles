const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUD_API_SECRET
});

module.exports = cloudinary;