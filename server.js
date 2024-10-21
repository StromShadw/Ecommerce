require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/user', require('./routers/userRouter.js'))
app.use('/api', require('./routers/categoryRouter.js'))

//connect MongoDB
const URL = process.env.MONGODB_URL;

const connectToDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Connected to DB');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};
// Call the function to connect to the database
connectToDB();


app.get('/',(req,res)=>{
    res.json({msg:'welcome to the ecommerce world'})
})


const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log('server is up and running',PORT);
    
})