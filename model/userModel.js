// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt= require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should habe more than 4 characters"],

    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minLength:[6,"Password should be atleast 6 character length"],

    }
    ,
    email: {
        type: String,
        required: [true, "Please Enter Your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    urls: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "Url"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Compare Password
userSchema.methods.authenticate = async function (enteredPassword) {
    console.log("Inside model")
    console.log(this.password)
    console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword, this.password)
};

module.exports = mongoose.model("User", userSchema)