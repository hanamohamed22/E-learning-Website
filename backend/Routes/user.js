const express=require('express')
//contoller functions
const {signupUser,loginUser}=require('../Routes/userController')
const router = express.Router()

//login route
router.post('/login',()=>{})

//sign up route
router.post('/signup',()=>{})

module.exports= router;