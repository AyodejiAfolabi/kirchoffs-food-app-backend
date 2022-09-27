let express=require('express');
const app= express();
const cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(express.json({limit:'50mb'}))
app.use(cors({origin:'*'}))
require('dotenv').config()
const foodRouter= require('./routes/food.route')
const adminRouter= require('./routes/admin.route')
app.use('/food',foodRouter)
app.use('/admin',adminRouter)

app.set('view engine',"ejs")    
let PORT= process.env.PORT||4000
const URL=process.env.URL;

const cloudinary = require('cloudinary')


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});




app.get('/',(req,res)=>{
res.send('HELLO WORLD, Backend is running')
})



mongoose.connect(URL,(err)=>{
if(err){
	console.log('Error in Connection')
}else{
	console.log('succesful connected to databse')
}
})






app.listen(PORT,()=>{
	console.log('running on port 4000');
})