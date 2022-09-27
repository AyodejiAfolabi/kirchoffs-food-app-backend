const mongoose=require('mongoose')
const foodController= require('../controllers/food.controller')


const paymentSchema=mongoose.Schema({
    orderId:{type:String, default:'Test 0000'},
    address:String,
    name:String,
    phone:String,
    description:String,
    email:String,
    items:Array,    
    totalCost:String,
    accepted:{type:Boolean,default:false}
})


const paymentModel=mongoose.model('transaction',paymentSchema)



module.exports=paymentModel