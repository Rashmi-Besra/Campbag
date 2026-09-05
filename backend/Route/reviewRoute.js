import express from "express";

import auth from "../middleware/auth.js";

import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();


// Create
router.post(
    "/",
    auth,
    createReview
);


// Get product reviews
router.get(
    "/product/:productId",
    getProductReviews
);


// Update
router.put(
    "/:id",
    auth,
    updateReview
);


// Delete
router.delete(
    "/:id",
    auth,
    deleteReview
);


export default router;