import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { addProduct } from "../controllers/productController.js";


const productRoute = express.Router();

productRoute.get("/", (req, res) => {
  res.send("Product Route Working");
});


productRoute.post(
  "/add",
  auth,
  upload.array("images", 4),
  addProduct
);



export default productRoute;