import express from "express";

import {
    getSellerProfile,
    getSellerProducts,
} from "../controllers/sellerProfileController.js";

const sellerProfileRoute = express.Router();

// Public routes
sellerProfileRoute.get("/:sellerId", getSellerProfile);

sellerProfileRoute.get("/:sellerId/products", getSellerProducts);
sellerProfileRoute.get("/test", (req, res) => {
    res.json({ message: "Seller route working" });
});
export default sellerProfileRoute;