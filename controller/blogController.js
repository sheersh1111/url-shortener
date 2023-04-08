const Blog = require("../model/blogModel");

// const mongoose= require("mongoose");

//Create Blog
exports.createBlog = async (req, res) => {

    // req.body.user = req.user.id;
    const blog = await Blog.create(req.body);// body contains userId, Blog Name, description
    return res.status(201).json({
        success: true,
        blog
    });
};

//GET ALL BLOGS
exports.getAllBlogs = async (req, res, next) => {

    const blogs= await Blog.find()

    res.status(200).json({
        success: true,
        blogs
    })
};
