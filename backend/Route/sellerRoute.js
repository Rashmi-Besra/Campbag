import express from "express";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";


import {
    getDashboard,
    getSellerProducts,
     createProduct,
    deleteSellerProduct,
    getSellerProductById,
    updateSellerProduct,
    getSellerOrders,
    updateOrderStatus
} from "../controllers/sellerController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboard);

router.get("/products", authMiddleware, getSellerProducts);

router.post(
    "/product",
    authMiddleware,
    upload.array("images", 5),
    createProduct
);
router.get(
    "/product/:id",
    authMiddleware,
    getSellerProductById
);

router.put(
    "/product/:id",
    authMiddleware,
    upload.array("images", 5),
    updateSellerProduct
);
router.delete(
  "/product/:id",
  authMiddleware,
  deleteSellerProduct
);

router.get(
    "/orders",
    authMiddleware,
    getSellerOrders
);

router.patch(
    "/order/:id/status",
    authMiddleware,
    updateOrderStatus
);

export default router;