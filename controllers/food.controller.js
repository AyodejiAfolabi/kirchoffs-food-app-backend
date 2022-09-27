
const foodModel = require("../model/food.model")
const paymentModel = require("../model/transaction.model")

const uploadfood=(request,response)=>{
let foodBody=request.body
let form=new foodModel(foodBody)
form.save((err)=>{
    if(err){
        response.status(501).send({status:false, message:'internal server error'})
    }
    else{
        fetchAllFood(response)
    }
})

}

const getFoods=(request,response)=>{
fetchAllFood(response)
}

const fetchAllFood=(response)=>{
foodModel.find( (err,result)=>{
if (err){
    response.send({status:true, message:'succesfully added', foodtray:[]})

}
else{
    response.send({status:true, message:'succesfully added', foodtray:result})

}} )
}

const saveChange=(request,response)=>{
let foodtray=request.body

foodtray.forEach( (each,i)=>{

    foodModel.findByIdAndUpdate(each._id,each,(err)=>{

        if(err){
            response.send(JSON.stringify({message:'Operation Failed',status:false}))
         }

    })
})
fetchAllFood(response)

}

const removeOne=(request,response)=>{
let obj=request.body
foodModel.findByIdAndDelete(obj.foodIndex, (err)=>{
    if(err){
        response.send({message:'Operation Failed',status:false})
     }
     else{
         fetchAllFood(response)
}
})
}
const saveTransaction=(request,response)=>{
    
updateFood(request.body.items,response)
    request.body.orderId= `CART${Math.floor(Math.random()*10000)}`
    let form= new paymentModel(request.body)
    form.save( err=>{
        if(err){
            response.status(501).send({status:false,message:'Internal server error'})
        }else{
            response.send({status:true,cartId:request.body.orderId})
        }
    })    
}

const updateFood=(items,response)=>{
    let actionCompleted=0
    let itemsLength=items.length
    items.forEach((each)=>{
        foodModel.findById(each._id, (err,food)=>{
            if(food){
                foodModel.findByIdAndUpdate({_id:each._id},{quantity:food.quantity-each.orderQuantity},(err)=>{
                    if(!err){
                        actionCompleted++
                        if(actionCompleted==itemsLength){

                            return true
                        }
                    }else{
                        console.log('cant perform manipulation')
                    }
                })
            }else{
                console.log('cant find food')
            }
        })
    })

}
const editFood=(request,response)=>{
    let body=request.body
    console.log(body)
    foodModel.findOneAndUpdate({_id:body.id},{quantity:body.quantity,price:body.price,foodName:body.foodName},(err)=>{
        if(!err){
            console.log('editted')
            response.send({status:true})
        }else{
            response.send({status:false})
            console.log('failed')
        }
    })
}
const fetchHistory=(request,response)=>{
    paymentModel.find({email:request.body.email}, (err,result)=>{
        if(!err){
            response.send({status:true, transactions:result})
        }else{
            response.send({status:false})
        }

    })
    

}
module.exports={uploadfood,getFoods,saveChange,removeOne,saveTransaction,editFood,fetchHistory}