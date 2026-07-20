import express from 'express';
import {loginUser,userRegister,verifyOTP} from '../controllers/userController.js'


const userRoute=express.Router();


userRoute.post("/register", userRegister);

userRoute.post("/verify-otp", verifyOTP);

userRoute.post("/login", loginUser);



export default userRoute;
