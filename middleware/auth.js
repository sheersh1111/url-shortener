const jwt = require("jsonwebtoken");
const catchAsyncErrors= require("../middleware/catchAsyncerrors");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorhandler");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
    const {token}= req.cookies;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please Login to access resource"
        });
    }
    const decodedData= jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decodedData);
    req.user =await User.findById(decodedData.id);
    next();
});