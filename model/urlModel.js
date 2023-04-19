const mongoose= require("mongoose");
const urlSchema = new mongoose.Schema({
    
    shortUrl:{
        type: String,
        required: true,
        unique: true
    },
    urlCode:{
        type: String,
        required: true,
        unique: true
    },
    longUrl:{
        type:String,
        required:true,
        unique: true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
module.exports= mongoose.model("Url",urlSchema);