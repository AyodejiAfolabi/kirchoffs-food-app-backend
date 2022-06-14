const userModel = require("../model/user.model")
const bcrypt= require('bcryptjs')
const res = require("express/lib/response")
const jwt=require('jsonwebtoken')
const secret=process.env.JWT_SECRET
const getLandingPage=(req,res)=>{
res.send('hello world home page')
}
const signin=(req,response)=>{
const email=req.body.email
const password=req.body.password
userModel.findOne({email:email}, (err,user)=>{
    if (err){
        response.status(501).send({message:'server error', status:false})
    }else{

        if(!user){
            response.send({message:'NO VALID USER', status:false})
        }
        else{
           user.validatePassword(password, (err,same)=>{
            if(same){
                const token=jwt.sign({email}, secret, {expiresIn:'1m'})
                console.log(token)
                response.send({message:'correct password', status:true,token})
              } else{
                  console.log(err)
                  response.send({status:false, message:' baba rest'})
              }
                           
           })
           
        }
    }
})
}
const postSignUp=(req,res)=>{

    const userDetails=req.body
    userModel.find({email:req.body.email}, (err,result)=>{
        console.log(result)
        if(result.length==0){
let form=new userModel(userDetails)
form.save( (err)=>{
    if(err){
        console.log('cant sign up')
        res.send({status:false,message:'registration failed'})

    }
    else{
        res.send({status:true,message:'registration succesful'})
    }
}
)

        }else{
            console.log('registered already')
        res.send({status:false,message:'You have already registered'})


        }
    })

}
const getDashboard=(req,res)=>{
let splitJwt=req.headers.authorization.split(' ')
let token=splitJwt[1]

jwt.verify(token,secret, (err,result)=>{
    if (err){
        console.log(err)
        res.send({status:false,message:'unathorized'})
    }else{

        userModel.findOne({email:result.email}, (err,Userdetails)=>{

if(err){
    res.status(501).send({status:false, message:'internal server error'})
}
else{
    
    res.send({status:true,message:'still valid', Userdetails})
}

        })

    }
})
}

module.exports={getLandingPage,signin,postSignUp,getDashboard}