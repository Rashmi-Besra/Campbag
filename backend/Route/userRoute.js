import express from 'express';
import {loginUser,userRegister,verifyOTP,getMyProfile,completeProfile,updateMyProfile,deleteAccount} from '../controllers/userController.js'
import auth from "../middleware/auth.js";

const userRoute=express.Router();


userRoute.post("/register", userRegister);

userRoute.post("/verify-otp", verifyOTP);

userRoute.post("/login", loginUser);

userRoute.get(
    "/profile",
    auth,
    getMyProfile
);


// Complete profile
userRoute.put(
    "/complete-profile",
    auth,
    completeProfile
);

userRoute.put("/profile", auth, updateMyProfile);
userRoute.delete(
  "/delete-account",
  auth,
  deleteAccount
);

export default userRoute;
