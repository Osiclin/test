const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const removeTmp = require('../utils/removeTmp')
const cloudinary = require('../utils/cloudinary')
const uploader = cloudinary.uploader


const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{12,}$/; //regex to check if password has 1 uppercase, 1 special character, and minimum of 12 characters
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


const registerUser = async (req,res) => {
    const { name, email, password, phone } = req.body

    const passwordTest = regexPassword.test(password)
    const phoneTest = phone.match(/\d/g).length > 10;
    const emailTest = regexEmail.test(email)
    
    let errors = []

    //VALIDATE INPUT
    if(name === ''|| email === '' || password === '') errors.push('All fields are required!!!')
    if(!emailTest) errors.push('Invalid Email!!!')
    if(!phoneTest) errors.push('Invalid Phone number!!!')
    if(!passwordTest) errors.push('Password should be minimum of 12 characters')    
    if(errors.length) return res.status(422).json({ errors: errors })

    try{
        //Check if user with email or username already exist
        const checkEmail = await User.findOne({ email: email }) 

        if(checkEmail) errors.push('Email already exists')
        if(errors.length) return res.status(422).json({ errors: errors })

        //check if image file exist
        if(!req.files || Object.keys(req.files).length === 0) errors.push('No files selected')
        if(errors.length) return res.status(422).json({ errors: errors })
        
        const file = req.files.file

        if(file.size > 1024 * 97.6) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ errors: 'File is more than 4mb' })
        }
        
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ errors: 'File format not supported' })
        }

        uploader.upload(file.tempFilePath, { folder: "test" }, async (error, result) => {
            if(error) throw error

            removeTmp(file.tempFilePath)

            const { public_id, secure_url } = result

            const newUser = new User({
                name,
                email,
                phone,
                password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString(), //encrypt password using cryptojs
                image: {
                    url: secure_url,
                    id: public_id
                }
            })

            const savedUser = await newUser.save()
            res.status(201).json({ message: 'User created succesfully!!!' })
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const passwordTest = regexPassword.test(password)
    const emailTest = regexEmail.test(email)

    let errors = []

    //VALIDATE INPUT
    if(!emailTest) errors.push('Invalid Email address')
    if(!passwordTest) errors.push('Password should be minimum of 12 characters')
    if(errors.length) return res.status(422).json({ errors: errors })

    try{
        const user = await User.findOne({email: req.body.email})
        
        const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8)
        
        if(password !== decryptPassword || !user) errors.push('Wrong Credentials!!!')
        if(errors.length) return res.status(401).json({ errors: errors })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET_KEY, { expiresIn:"1d" })

        const { image, email } = user._doc

        const data = { email, token, image }
        
        res.status(200).json({ 
            data,  
            message: 'Login Successful!!!'
        })
    }catch(err) {
        res.status(500).json(err)
    }
}

module.exports = { registerUser, loginUser }