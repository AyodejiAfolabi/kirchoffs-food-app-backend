const adminModels= require('../model/admin.model')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const paymentModel = require('../model/transaction.model')

const signup = (request,response)=>{
let form = new adminModels(request.body)

form.save( (err)=>{

    if(err){
response.status(501).send({status:false, messsage:'internal server error'})
    }
    else{
response.send({status:true, messsage: 'operation succesful'})   
    }

})

}

const signin =(request,response)=>{
    let adminModel=adminModels
    const email=request.body.email
    const password=request.body.password
const secret= process.env.JWT_SECRET

adminModel.find( (err,user)=>{
if (err){
response.status(501).send({message:'server error', status:false})
} 
else{
user=user[user.length-1]
if(user){
if(email==user.email){
bcrypt.compare( password,user.password, (err,same)=>{
 if(err){
response.status(501).send({status:false, messsage:'internal server error, please connect and login.'})

 }
else{
if(same){

const token=jwt.sign({email}, secret, {expiresIn:'60m'})
console.log(token)
response.send({message:'correct password', status:true,token})

} 
else{ 
response.send({status:false, message: 'incorrect password'})  
}
}
})
}else{
    response.send({status:false, message:'Invalid email'})
}
}

}
})     
}


const authenticate=(request,response)=>{
    let splitJwt=request.headers.authorization.split(' ')
    let token=splitJwt[1]
    const secret= process.env.JWT_SECRET
    let adminModel=adminModels
 jwt.verify(token,secret, (err,result)=>{
if (err){
response.send({status:false,message:'your session has expired, please login again.'})
}else{
    
adminModel.findOne({email:result.email}, (err,admindetails)=>{
    
if(err){
        response.send({status:false, message:'internal server error, please connect and login.'})
 }
 else{
        
response.send({status:true,message:'still valid', admindetails})
}
    
})
    
}
})

}
const allTrans=(request,response)=>{
    paymentModel.find( (err,result)=>{
        if(!err){
            response.send({status:true,transactions:result})
        }
    })
    
}
const approveTx=(request,response)=>{
    paymentModel.findByIdAndUpdate({_id:request.body._id},{accepted:true}, (err)=>{
        if(!err){
            response.send({status:true})
        }else{
            respone.send({status:false})
        }
    })

}
module.exports={signup,signin,authenticate,allTrans,approveTx}