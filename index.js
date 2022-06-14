let express=require('express');
const app= express();
const ejs=require('ejs')
const cors=require('cors')
const mongoose=require('mongoose')
// app.use(express.static(__dirname+'.build'))
// app.use(express.static(''))const cors=require('cors')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(express.json({limit:'50mb'}))
app.use(cors({origin:'*'}))
require('dotenv').config()
const userRouter= require('./routes/user.route')
app.use('/user',userRouter)
app.set('view engine',"ejs")    
let allStudents=[]
let allTodos=[]
let lovePercentage=false;
let PORT= process.env.PORT||4000
const URL='mongodb+srv://JayFab200:o8o88379502@cluster0.qtfme.mongodb.net/user_tb?retryWrites=true&w=majority';

const cloudinary = require('cloudinary')
console.log(process.env.API_KEY)
console.log(process.env.CLOUD_NAME)
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});





let userSchema=mongoose.Schema({
	firstname:String,
	lastname:String,
	email:String,
	password:String

})
let loveSchema=mongoose.Schema({
    lover:String,
    beloved:String
})
const loveModel=mongoose.model('love_tb',loveSchema)

const userModel=mongoose.model('user_tb',userSchema)

app.get('/',(req,res)=>{
userModel.find( (err,result)=>{
	if(err){
		console.log(err)
	}
	else{
		console.log(result)
res.render("first", {allStudents:result})
		
	}
})

})
app.get('/signup',(req,res)=>{
	// res.sendFile(__dirname+"/index.html")
	res.render("form")
	
	})
mongoose.connect(URL,(err)=>{
if(err){
	console.log('Error in Connection')
}else{
	console.log('succesful connected to databse')
}
})
app.get('/reactform',(req,res)=>{
    res.send('happy hacking')
})

    // const file =req.body.myfile
    // cloudinary.v2.uploader.upload(file,(err,result)=>{
    //     if(err){
    //         console.log(err)
    //         res.send({message:'upload failed'})
    //     }else{
    //         console.log(result.secure_url)
    //         res.send({message:'upload successful',image:result.secure_url})
    //     }
    // }); 


// app.post('/signup',(req,res)=>{
// 	const userDetails = req.body
//     userModel.find({email:req.body.email},(err,result)=>{
//   if(err){console.log(`error dey`)
//     }else{
//    if(result.length>0){
// console.log(result)
// console.log(`user exists`)
//  }else{
// let form = new userModel(userDetails)
// form.save((err)=>{
//    if(err){
//   console.log(`data no gree save`)
// }else{
//  res.redirect("/");
//  }
//  })
// }
// }
//     })
  
// 	})

	// app.post('/delete',(req,res)=>{
	// 	let myIndex = req.body.ind
    // console.log(myIndex)
    // userModel.deleteOne({_id:myIndex},(err,result)=>{
    //     if(err){
    //         console.log(`I have refused to delete`)
    //     }else{
    //         console.log(`user deleted successfully`)
    //         res.redirect("/")
    //     }
    // })})
//     app.get('/love', (req,res)=>{
// res.render('lovecalculator',{lovePercentage})
//     })

//     app.post('/love', (req,res)=>{
// let form = new loveModel(req.body)
// form.save((err)=>{
//    if(err){
//   console.log(`data no gree save`)
// }else{
// let {lover,beloved}=req.body
// let totalLength=(lover.length+beloved.length)/2
// let loverArr=lover.split('')
// let belovedArr=beloved.split('')
// let common=0
// loverArr.forEach(letter1 => {
//     belovedArr.forEach( letter2=>{
//         if(letter1==letter2){
//             common++;
//             lovePercentage=(common/totalLength*100).toFixed(0)
            
//         }
//     })
// });
// console.log(common)
//  res.redirect("/love");
//  }
//  })})
        

app.listen(PORT,()=>{
	console.log('running on port 4000');
})