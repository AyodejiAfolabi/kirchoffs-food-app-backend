const express= require('express')
const userRouter=express.Router()
const userController= require('../controllers/user.controller')
userRouter.get('/',userController.getLandingPage)
userRouter.post('/signup',userController.postSignUp)
userRouter.post('/login',userController.signin)
userRouter.get('/dashboard',userController.getDashboard)



// userRouter.post('/signup', (req,res)=>{
//     console.log('post sign up')
// })


module.exports=userRouter