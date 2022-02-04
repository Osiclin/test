const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fileupload = require('express-fileupload')
const app = express()
const PORT = process.env.PORT || 3001

dotenv.config()

const userRoute = require('./routes/user')

mongoose.connect(process.env.DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log('DB Connected'))
.catch(err => console.log(err))

app.use(cors())
app.use(express.json())
app.use(fileupload({ useTempFiles: true }))


app.use('/', userRoute)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})