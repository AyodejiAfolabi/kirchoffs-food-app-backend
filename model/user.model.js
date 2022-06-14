const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')

let userSchema= mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})
let saltround=10

userSchema.pre('save', function(next){
bcrypt.hash(this.password,saltround, (err,hashedPassword)=>{

if(err){
    console.log(err)
}else{
    console.log(hashedPassword)
    this.password=hashedPassword
    next()
}

})
})

userSchema.methods.validatePassword= function(password,callback){
    // console.log(this)
    bcrypt.compare(password,this.password, (err,same)=>{
        if(!err){
            callback(err,same)
        }
        else{
        next()
        }
    })
}

let userModel=mongoose.model('users', userSchema)
module.exports=userModel