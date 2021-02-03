const hashPassword = require('../utils/hash')
const _=require('lodash')
const {authSchema} =  require('../models/user.model')
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model("User")

var router = express.Router();

router.get('/',async(req,res)=>{
    console.log(User)
    const users = await  User.find().sort({name:1}); // ascending 1 or descendin -1
    return res.send(users)
})

router.post('/',async(req,res)=>{
    const {error} =authSchema.validate(req.body)
 if(error) return res.send(error.details[0].message)

 let user = await User.findOne({email:req.body.email})
 console.log(user)

 if(user)  return res.send('User already exist ')

 user = new User(_.pick(req.body,['name','email','password','isAdmin']))
 const hashed = await hashPassword(user.password)

 user.password= hashed
 await user.save()

 return res.send(_.pick(user,['_id','name','email','isAdmin'])).status(201)
});

router.delete('/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id)
    .then(user => res.send(user))
     .catch(err => res.send(err).status(404));
})

router.get('/email', async(req,res)=>{
    const users =await User.find({email:req.params.email})
    return res.send(users)
});

router.get('/non-admin', (req,res)=>{
    User.find({isAdmin:false})
    .then(user => res.send(user))
    .catch(err => res.send(err).status(404));
});

router.get('/admin',(req,res)=>{
    User.find({isAdmin:true})
    .then(user => res.send(user))
    .catch(err =>res.send(err).status(404));
});


module.exports=router;