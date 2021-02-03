const express =require('express')
const mongoose=require('mongoose')
const admin=require('../middlewares/admin')
var router=express.Router()

const Student= mongoose.model('Student')
var router =express.Router();
router.post('/',admin,(req,res)=>{
    let student =new Student();
    student.fname=req.body.fname;
    student.lname=req.body.lname;
    student.class=req.body.class;
    student.save()
    .then(studentSaved =>res.send(studentSaved).status(201))
    .catch(err=>res.send(err).status(400));
})

router.get('/',admin,(req,res)=>{
    Student.find()
    .then(student=>res.send(student).status(201))
    .catch(err=>res.send(err).status(404));
})

router.get('/:id',admin,(req,res)=>{
    Student.findById(req.params.id)
    .then(student=>res.send(student).status(201))
    .catch(err=>res.send(err).status(401))
})

router.put('/',admin,(req,res)=>{
   Student.findOneAndUpdate({id:req.body.id},
        req.body,{new:true})
        .then(student=>res.send(status).status(201))
        .catch(err=>res.send(err).status(404));
});

router.delete('/:id',admin,(req,res)=>{
   Student.findByIdAndRemove(req.params.id)
    .then(student =>res.send(student).status(201))
    .catch(err =>res.send(err).status);
});

router.get('/:class', (req,res) => {
    Product.find({class:req.params.class})
           .then(student => res.send(student))
           .catch(err => res.send(err).status(404));
        });

module.exports=router;