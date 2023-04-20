## url-shortener
https://url-shortener-ri3x.onrender.com/

## POSTMAN Documentation of API's
https://documenter.getpostman.com/view/21465485/2s93Y2TMnp

# Requirements for running in localhost
npm init
npm i dependencies

# Running the server in localhost
npm run dev

# File outline
 1. Model folder contains userModel and urlModel.
 2. Controller folder contains userController and urlController which contain respective of their api functions.
 3. Middleware contains all the middlewares like isAuthenticatedUser for protection of resource,or error handling or catching asynchronous errors.
 4. Utils

## Implementation of features:

# In userSchema in models:
  - name: string *len>=3 used minLength attribute of mongoose for this.
  - email: string *regex match - valid email  --used validator for this feature.
  - password: hex string *len>=6, 1 lowercase, 1 uppercase, 1 special character --used regex.test() in userController registerUser function.

# Authentication APIs: Sign-in, Sign-up, Sign-out. Usage of JSON Web Tokens to be done.
 For this in file /utils/jwtToken.js function getJWTToken is for generating token.
 then , that token is store in cookies in function sendTOken in the same file.
 then ,at the time of login or register sendToken is function is passed in userController file in controller folder.
 In case of logout cookie just destroyed so user gets logout.
 
 Also storing password in a hashed form, by passing bcrypt library function in user defined database method,
 as you wil see once you navigate to /model/userModel.js file.
 
# Authorization: Protected routes for access to resources.
  For , this feature, in /middleware/auth.js I have provided function isAuthenticatedUser ,acts as a middleware for protected route in routes/routes.js(functions in this file). 
#URL Shortening API:
  Route for this API is in routes/routes.js
  and Function is in urlController.
  
# Error Handling:
  In file /utils/errorHandler.js function extends to Error and uses Error.captureStackTrace and then passed to middleware/error.js file as a constructor.
  This way , inbuilt and both user raised error can be handled.

  As for,errors in api calls functions , I am wrapping all functions in middleware/catchAyncerrors.js file function which is using promise to resolve or catch errors. 
