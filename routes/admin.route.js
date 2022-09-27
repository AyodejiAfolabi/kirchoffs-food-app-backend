const express= require('express')
const adminRouter=express.Router()
const adminController= require('../controllers/admin.controller')

adminRouter.post('/signup',adminController.signup)
adminRouter.post('/signin',adminController.signin)
adminRouter.get('/authenticate',adminController.authenticate)
adminRouter.get('/allTrans',adminController.allTrans)
adminRouter.post('/approveTx',adminController.approveTx)





module.exports=adminRouter   