require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");


const newToken = (user) => {
   return jwt.sign({user}, process.env.JWT_SECRET_KEY); 
}

const register = async (req,res) => {
    try{
        let email = await User.findOne({email: req.body.email}).lean().exec();
        let name = await User.findOne({name: req.body.name}).lean().exec();
        let password = await User.findOne({password: req.body.password}).lean().exec();
        console.log("email-backend=>",email);
        console.log("name-backend=>",name);
        console.log("password-backend=>",password);
        if(email && name && password){
            return res.status(400).send({message: "Please try different credentials"});
        }
       if(email){
            return res.status(400).send({message: "Please try another email"});
        }
        if(name){
            return res.status(400).send({message: "This name already exists"});
        }
        if(password){
            return res.status(400).send({message: "Please try another password"});
        }

        const userDetails = await User.create(req.body);


        let token = newToken(email);
        
        res.send({userDetails, token});
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

const login = async (req,res) => {
    try{
        console.log('req.body.email:', req.body.email)
        const user = await User.findOne({email: req.body.email});
        console.log('user:', user)
        if(!user){
            return res.status(400).send({message: "Please try another email or password"});
        }

        const match= user.checkPassword(req.body.password);
        console.log(match)

        if(!match){
            return res.status(400).send({message: "Please try another email or password"});
        }

        
        const token = newToken(user);

        res.send({user, token});
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

module.exports = {register,login,newToken}