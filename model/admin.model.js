const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')

let saltround=10

const cloudinary = require('cloudinary')
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,   
    api_secret: process.env.API_SECRET
});


let adminSchema= mongoose.Schema({
  email:String,
  password:String
 
})

adminSchema.pre('save', function(next){
    
    bcrypt.hash(this.password,saltround, (err,hashedPassword)=>{

        if(err){
            console.log(err)
        }else{
            this.password=hashedPassword
            next()
        }
        
        })

} )


let adminModel=mongoose.model('admin', adminSchema)

module.exports=adminModel