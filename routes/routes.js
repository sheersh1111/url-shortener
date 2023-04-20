const express = require("express");
const { urlShortener, redirect } = require("../controller/urlController");
const { registerUser, loginUser, logout } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router= express.Router();

const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000*60, 
  max: 10,
  statusCode : 403,
  message: 'You have exceeded the 10 requests in 1 hour limit!',
  headers: true,
});


router.route("/user/register").post(registerUser); // register user
router.route("/user/login").post(loginUser); // login user
router.get("/logout",logout);//logout user


router.post("/shorten",isAuthenticatedUser,rateLimiter,urlShortener);//url shortener route
router.get("/:code",redirect);// url redirect


module.exports = router;