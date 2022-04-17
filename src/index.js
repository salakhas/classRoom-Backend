const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

const connect = require('./configs/db');
const {register,login,newToken} = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const teacherController  = require('./controllers/teacher.controller');
const classController = require('./controllers/class.controller');


app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/register',register);
app.post('/login',login);
app.use('/users',userController);
app.use('/teacher',teacherController);
app.use('/class',classController);


app.listen(process.env.PORT || 3000,async (req,res)=>{
    try {
        await connect();
        console.log('Listening on port 8080');
    } catch (error) {
        console.log('error:', error.message)
    }
})