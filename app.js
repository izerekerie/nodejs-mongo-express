require('./models/mongodb')
const studentController=require('./controllers/studentController')
const userController=require('./controllers/userController')
const express=require('express')
const authMiddleware=require('./middlewares/auth')
const auth=require('./controllers/auth')
const config =require('config')
var app =express()
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if(!config.get("jwtPrivateKey")){
    console.log('JWT PRIVATE KEY IS NOT DEFINED');
    process.exit(1)
}

app.get('/',(req,res)=>{
    res.send('welcome to our app');
});


app.use('/api/students',authMiddleware,studentController);
app.use('/api/auth',auth);
app.use('/api/users',userController);


const port=process.env.PORT || 6100;
app.listen(port,
    console.log(`listening on port ${port}`)
);
