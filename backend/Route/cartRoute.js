import express from "express";
import auth from "../middleware/auth.js";
import { addToCart,getCart,updateCart,clearCart } from "../controllers/cartController.js";

const cartRoute = express.Router();

cartRoute.post("/add", auth, addToCart);
cartRoute.get("/", auth, getCart);
cartRoute.put("/update", auth, updateCart);
cartRoute.delete("/clear", auth, clearCart);

export default cartRoute;