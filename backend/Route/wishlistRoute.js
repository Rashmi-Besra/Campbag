import express from "express";
import { addToWishlist,getWishlist,removeFromWishlist } from "../controllers/wishlistController.js";
import auth from "../middleware/auth.js";

const wishlistRoute = express.Router();

wishlistRoute.post("/add", auth, addToWishlist);
wishlistRoute.get("/", auth, getWishlist);
wishlistRoute.delete(
  "/remove/:productId",
  auth,
  removeFromWishlist
);

export default wishlistRoute;