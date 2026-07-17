import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { addProduct,getAllProducts,getSingleProduct,getMyProducts,updateProduct,deleteProduct } from "../controllers/productController.js";


const productRoute = express.Router();



productRoute.post(
  "/add",
  auth,
  upload.array("images", 4),
  addProduct
);
productRoute.get("/", getAllProducts);

productRoute.get("/my-products", auth, getMyProducts);

productRoute.get("/:id", getSingleProduct);

productRoute.put(
  "/:id",
  auth,
  updateProduct
);

productRoute.delete(
  "/:id",
  auth,
  deleteProduct
);

export default productRoute;