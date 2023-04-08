const mongoose= require("mongoose");
const blogSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"],
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
    
    }
    ,
    comments:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
        
        },
        comment:{
            type:String
        },
    createdAt:{
        type:Date,
        default:Date.now,
    }
    }]  

})
module.exports= mongoose.model("Blog",blogSchema);