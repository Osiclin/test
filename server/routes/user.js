const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/user')
const cloudinary = require('../utils/cloudinary')
const cloudinaryConfig = cloudinary.cloudinaryConfig

router.post('/login', loginUser)

router.post('/register', cloudinaryConfig, registerUser)

module.exports = router