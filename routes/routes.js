const express = require("express");
const { createBlog, getAllBlogs } = require("../controller/blogController");
const { createBlogComment, registerUser, klevelfriends } = require("../controller/userController");
const router= express.Router();

router.route("/user/register").post(registerUser); // reegister user
router.post("/blog/comment/create",createBlogComment);// making comment on a blog
router.get("/users/:userId/level/:k",klevelfriends);  // finding kth level friends of a user

router.post("/blog/create",createBlog);  // creating a blog by a user
router.get("/blog/all",getAllBlogs);  // api to fetch all the blogs in database




module.exports = router;