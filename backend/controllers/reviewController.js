import {
    createReviewService,
    getProductReviewsService,
    updateReviewService,
    deleteReviewService,
} from "../services/reviewService.js";

import {
    createReviewSchema,
    updateReviewSchema,
} from "../Validators/reviewValidator.js";


// ==============================
// CREATE REVIEW
// ==============================

export const createReview = async (req, res) => {

    try {

        const validatedData =
            createReviewSchema.parse(req.body);

        const review =
            await createReviewService(
                req.user._id,
                validatedData
            );

        return res.status(201).json({

            success: true,

            message: "Review added successfully.",

            review,

        });

    } catch (error) {

        console.log(
            "CREATE REVIEW ERROR:",
            error
        );

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }
};


// ==============================
// GET PRODUCT REVIEWS
// ==============================

export const getProductReviews = async (
    req,
    res
) => {

    try {

        const reviews =
            await getProductReviewsService(
                req.params.productId
            );

        return res.status(200).json({

            success: true,

            reviews,

        });

    } catch (error) {

        console.log(
            "GET REVIEWS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};


// ==============================
// UPDATE REVIEW
// ==============================

export const updateReview = async (
    req,
    res
) => {

    try {

        const validatedData =
            updateReviewSchema.parse(req.body);

        const review =
            await updateReviewService(

                req.user._id,

                req.params.id,

                validatedData

            );

        return res.status(200).json({

            success: true,

            message: "Review updated successfully.",

            review,

        });

    } catch (error) {

        console.log(
            "UPDATE REVIEW ERROR:",
            error
        );

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }
};


// ==============================
// DELETE REVIEW
// ==============================

export const deleteReview = async (
    req,
    res
) => {

    try {

        await deleteReviewService(

            req.user._id,

            req.params.id

        );

        return res.status(200).json({

            success: true,

            message: "Review deleted successfully.",

        });

    } catch (error) {

        console.log(
            "DELETE REVIEW ERROR:",
            error
        );

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }
};