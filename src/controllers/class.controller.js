const express = require('express');

const authenticate = require('../middlewares/authenticate');
const authorise = require("../middlewares/authorise");
const Class = require("../models/class.model");
const router = express.Router();

router.post('',authenticate,authorise(["admin"]),async(req,res)=>{
    try {
        const classes = await Class.create(req.body);
        return res.status(201).send(classes);
    } catch (error) {
        return res.send(500).send(error.message);       
    }
})

router.get('', async (req,res) => {
    try{
        
        const classes = await Class.find()
        .populate({
            path: "teacher",
            select: ["name", "gender","age"]
        })
        .lean().exec();
        res.status(200).send(classes);
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
})

router.get('/count',async(req,res)=>{
    try {
        let filter={};
        if(req.query._id){
            const _id = req.query._id;
            console.log('_id:', _id)
            filter._id =  _id;
            console.log('filter:', filter)
        }

        const classes = await Class.find({teacher: filter})
        .populate({
            path: "teacher",
            select: ["name", "gender","age"]
        })
        .lean().exec();
        const totalClasses = Math.ceil(
            (await Class.find({teacher: filter}).countDocuments())
          );  
        res.status(200).send({classes,totalClasses});
    } catch (error) {
        res.status(500).send({message : error.message});
    }
})

router.get(':/id', async (req,res) => {
    try{
        const classes = await Class.find({_id: req.params.id})
        .populate({
            path: "teacher",
            select: ["name", "gender","age"]
        })
        .lean().exec();
        res.status(200).send(classes);
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
})

router.patch('',authenticate,authorise(["admin"]),async(req,res)=>{
    try {
        const classes = await Class.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(201).send(classes);
    } catch (error) {
        return res.send(500).send(error.message);       
    }
})

module.exports = router;