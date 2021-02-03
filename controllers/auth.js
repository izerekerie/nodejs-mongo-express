// const hashPassword = require('../utils/hash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Joi = require('joi')
const _=require('lodash')

const express = require('express')
const User = mongoose.model("User")

var router = express.Router();

router.post('/jwt',async(req,res)=>{
    const {error} = schema.validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.send('Invalid email or password').status(400)

    const validPassword  = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send('invalid email or password').status(400)

    return res.send(user.generateAuthToken())

});

 router.post('/bcrypt', async(req,res)=>{
     const {error} = schema.validate(req.body)
     if(error) return res.send(error.details[0].message).status(400)

     let user = await User.findOne({email:req.body.email})
     if(!user) return res.send('invalid email ').status(400)
        
     const validPassword = await bcrypt.compareSync(req.body.password,user.password);
     console.log(validPassword)
     if(!validPassword) return res.send(validPassword).status(400);
     return res.send(_.pick(user,['_id','name','email']));

 })

    const schema = Joi.object({
        email: Joi.string().max(255).min(3).required().email(),
        password:Joi.string().max(255).min(3).required()
    })
   

module.exports = router;
