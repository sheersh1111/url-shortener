// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should habe more than 4 characters"],

    },
    email: {
        type: String,
        required: [true, "Please Enter Your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter your email"]
    },
    friends: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});






module.exports = mongoose.model("User", userSchema)