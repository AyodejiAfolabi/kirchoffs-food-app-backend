const mongoose=require('mongoose')

const cloudinary = require('cloudinary')
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


let foodSchema= mongoose.Schema({
  foodName:{type:String, required:true},
  quantity:{type:Number, required:true},
  price:{type:String, required:true},
  filename:{type:String, required:true}
})

foodSchema.pre('save', function(next){

    const file =this.filename
    cloudinary.v2.uploader.upload(file,{public_id:this.foodName},(err,result)=>{
        if(err){
            console.log(err)
        }else{

         let publicName=this.foodName
         let imageUrl=result.secure_url
         let splitting=imageUrl.split('upload')
         let path=splitting[0]+'upload'
         let newImagepath=`${path}/${'w_400,h_280,c_scale'}/${publicName}`
            this.filename=newImagepath
            next()
        }
    }); 

   })



let foodModel=mongoose.model('food', foodSchema)
module.exports=foodModel