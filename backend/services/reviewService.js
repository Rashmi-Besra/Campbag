import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";


// =====================================================
// HELPER: RECALCULATE PRODUCT RATING
// =====================================================

const recalculateProductRating = async (productId) => {

    const reviews = await Review.find({
        product: productId,
    }).select("rating");

    const reviewCount = reviews.length;

    let averageRating = 0;

    if (reviewCount > 0) {

        const totalRating = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        averageRating =
            totalRating / reviewCount;
    }

    await Product.findByIdAndUpdate(
        productId,
        {
            rating:
                Math.round(averageRating * 10) / 10,

            reviewCount,
        }
    );
};


// =====================================================
// CREATE REVIEW
// =====================================================

export const createReviewService = async (
    userId,
    reviewData
) => {

    const {
        productId,
        orderId,
        rating,
        comment,
    } = reviewData;


    // 1. Verify order belongs to buyer

    const order = await Order.findOne({
        _id: orderId,
        user: userId,
    });

    if (!order) {

        throw new Error(
            "Order not found."
        );

    }


    // 2. Review only after delivery

    if (order.orderStatus !== "Delivered") {

        throw new Error(
            "You can review a product only after it is delivered."
        );

    }


    // 3. Verify product exists in order

    const purchasedItem = order.items.find(
        (item) =>
            item.product.toString() ===
            productId.toString()
    );

    if (!purchasedItem) {

        throw new Error(
            "You can only review products you purchased."
        );

    }


    // 4. Verify product exists

    const product = await Product.findById(
        productId
    );

    if (!product) {

        throw new Error(
            "Product not found."
        );

    }


    // 5. Prevent duplicate review

    const existingReview =
        await Review.findOne({
            product: productId,
            user: userId,
        });

    if (existingReview) {

        throw new Error(
            "You have already reviewed this product."
        );

    }


    // 6. Create review

    const review = await Review.create({

        product: productId,

        user: userId,

        order: orderId,

        rating,

        comment: comment || "",

    });


    // 7. Recalculate rating

    await recalculateProductRating(
        productId
    );


    return review;
};


// =====================================================
// GET PRODUCT REVIEWS
// =====================================================

export const getProductReviewsService = async (
    productId
) => {

    const reviews = await Review.find({
        product: productId,
    })
        .populate(
            "user",
            "name profileImage"
        )
        .sort({
            createdAt: -1,
        });

    return reviews;
};


// =====================================================
// UPDATE REVIEW
// =====================================================

export const updateReviewService = async (
    userId,
    reviewId,
    reviewData
) => {

    const {
        rating,
        comment,
    } = reviewData;


    // 1. Find review belonging to current user

    const review = await Review.findOne({

        _id: reviewId,

        user: userId,

    });

    if (!review) {

        throw new Error(
            "Review not found or you are not authorized to update it."
        );

    }


    // 2. Update review

    review.rating = rating;

    review.comment = comment || "";

    await review.save();


    // 3. Recalculate product rating

    await recalculateProductRating(
        review.product
    );


    return review;
};


// =====================================================
// DELETE REVIEW
// =====================================================

export const deleteReviewService = async (
    userId,
    reviewId
) => {

    // 1. Find review belonging to current user

    const review = await Review.findOne({

        _id: reviewId,

        user: userId,

    });

    if (!review) {

        throw new Error(
            "Review not found or you are not authorized to delete it."
        );

    }


    const productId = review.product;


    // 2. Delete review

    await Review.deleteOne({
        _id: reviewId,
    });


    // 3. Recalculate product rating

    await recalculateProductRating(
        productId
    );
};