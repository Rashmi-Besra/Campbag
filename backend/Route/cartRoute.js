import express from "express";
import auth from "../middleware/auth.js";
import { addToCart,getCart,updateCart,clearCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", auth, addToCart);
cartRouter.get("/", auth, getCart);
cartRouter.put("/update", auth, updateCart);
cartRouter.delete("/clear", auth, clearCart);

export default cartRouter;