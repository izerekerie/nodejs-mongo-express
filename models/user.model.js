const mongoose = require('mongoose');
const Joi=require('@hapi/joi')
const config = require('config')
const jwt  =  require('jsonwebtoken')
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:255,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        maxlength:255,
        minlength:3
    },
    password:{
        type:String,
        required:true,
        unique:true,
        maxlength:255,
        minlength:3,
    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:true,
    }
});
userSchema.methods.generateAuthToken = function(){
const token  =jwt.sign({_id:this._id,name:this.name,email:this.email,isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
return token
}
const user=mongoose.model('User',userSchema);


    const authSchema=Joi.object({
        name:Joi.string().max(255).min(3).required(),
        email:Joi.string().max(255).min(3).required(),
    
        password:Joi.string().max(255).min(3).required(),
        isAdmin:Joi.required()
    })
    


module.exports={authSchema}