const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { 
            url: { type: String, required: true, unique: true },
            id: { type: String, required: true }
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Users', UserSchema)