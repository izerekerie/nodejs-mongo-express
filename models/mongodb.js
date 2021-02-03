const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/demoD',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>console.log('connected to mongodb successfulyy ...'))
.catch(err=>console.log('failed to connect to mongodb', err));

require('./student.model')
require('./user.model')