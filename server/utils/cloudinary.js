const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')

dotenv.config()

const cloudinaryConfig = (req, res, next) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API, 
        api_secret: process.env.CLOUD_SECRET 
    });
    next()
}

module.exports = { cloudinaryConfig, uploader: cloudinary.uploader }