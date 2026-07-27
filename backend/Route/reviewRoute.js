import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createReview
);

router.get(
    "/product/:productId",
    getProductReviews
);

router.put(
    "/:id",
    authMiddleware,
    updateReview
);

router.delete(
    "/:id",
    authMiddleware,
    deleteReview
);

export default router;