const express= require('express')
const foodRouter=express.Router()
const foodController= require('../controllers/food.controller')
foodRouter.get('/getfoods',foodController.getFoods)
foodRouter.post('/upload',foodController.uploadfood)
foodRouter.post('/savechange',foodController.saveChange)
foodRouter.post('/removeOne',foodController.removeOne)
foodRouter.post('/saveTransaction',foodController.saveTransaction)
foodRouter.post('/editFood',foodController.editFood)
foodRouter.post('/getHistory',foodController.fetchHistory)





module.exports=foodRouter   