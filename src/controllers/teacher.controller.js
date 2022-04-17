const express = require('express');

const authenticate = require('../middlewares/authenticate');
const authorise = require('../middlewares/authorise');
const Teacher = require("../models/teacher.model");
const router = express.Router();

router.post('',authenticate,authorise(["admin"]),async(req,res)=>{
    try {
        const teacher = await Teacher.create(req.body);
        return res.status(201).send(teacher);
    } catch (error) {
        return res.send(500).send(error.message);       
    }
})

router.get('', async (req,res) => {
    try{
        const page = req.query.page || 1;
        const size = req.query.size || 5;
        

        let filter={$and: [{}], $or: [{}]};
        let sorts=1;
        if(req.query.age){
            console.log(req.query.age)
            if(req.query.age==='1'){
                sorts=1;
            }
            else if(req.query.age === '-1'){
                sorts=-1;
            }
        }
        if(req.query.gender){
            const gender = req.query.gender;
            filter.gender =  gender;
        }
        if(req.query.name){
            const name = req.query.name;
            filter.name = name;
        }
        console.log('sorts:', sorts)
        const teachers = await Teacher.find(filter)
        .skip((page - 1) * size)
      .limit(size).sort({age: sorts})
        .lean().exec();
        const totalPages = Math.ceil(
            (await Teacher.find(req.query).countDocuments()) / size
          );      

        res.status(200).send({teachers,totalPages});
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
})

/*router.get('/nameOfTeacher/:name',authenticate, async (req,res) => {
    try{
        const teachers = await Teacher.find({name: req.params.name}).lean().exec();
        res.status(200).send(teachers);
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
})
router.get('/gender/:gender',authenticate, async (req,res) => {
    try{
        const teachers = await Teacher.find({gender: req.params.name}).lean().exec();
        res.status(200).send(teachers);
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
})*/


router.get('/:id', async (req,res) => {
    try{
        console.log("Hi this is backend:",req.params.id)
        const teachers = await Teacher.find({_id: req.params.id}).lean().exec();
        res.status(200).send(teachers);
    }
    catch(err){
        res.status(500).send({message : err.message});
    }
})

router.patch('',authenticate,authorise(["admin"]),async(req,res)=>{
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(201).send(teacher);
    } catch (error) {
        return res.send(500).send(error.message);       
    }
})

module.exports = router;