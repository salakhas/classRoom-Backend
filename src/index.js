const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const connect = require('./configs/db');

const app = express();
const port = process.env.PORT || 3000;
const db = process.env.LINK;
app.listen( port,async (req,res)=>{
    try {
        await mongoose.connect(db);
        console.log(`Listening on port ${port}`);
    } catch (error) {
        console.log('error:', error.message)
    }
})

var cors = require('cors')


const {register,login,newToken} = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const teacherController  = require('./controllers/teacher.controller');
const classController = require('./controllers/class.controller');


app.use(cors());    
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/register',register);
app.post('/login',login);
app.use('/users',userController);
app.use('/teacher',teacherController);
app.use('/class',classController);

