import {
    createReviewService,
    getProductReviewsService,
    updateReviewService,
    deleteReviewService,
} from "../services/reviewService.js";

export const createReview = async (req, res) => {

    try {

        const review = await createReviewService(
            req.user._id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getProductReviews = async (req, res) => {

    try {

        const reviews = await getProductReviewsService(
            req.params.productId
        );

        res.json({
            success: true,
            reviews,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateReview = async (req, res) => {

    try {

        const review = await updateReviewService(
            req.user._id,
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Review updated successfully",
            review,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const deleteReview = async (req, res) => {

    try {

        await deleteReviewService(
            req.user._id,
            req.params.id
        );

        res.json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};