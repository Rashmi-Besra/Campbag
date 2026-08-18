import express from "express";

import {
    getMyProfile,
    updateMyProfile,
} from "../controllers/profileController.js";

import auth from "../middleware/auth.js";

const profileRoute = express.Router();


// Get logged-in user's profile
profileRoute.get(
    "/",
    auth,
    getMyProfile
);


// Update logged-in user's profile
profileRoute.put(
    "/",
    auth,
    updateMyProfile
);


export default profileRoute;