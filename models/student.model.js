const mongoose = require('mongoose');

var studentSchema= new mongoose.Schema({

    fname:{
    type:String,
    required:true,
    },
    lname:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    }
})

mongoose.model('Student',studentSchema);