import Review from "../models/Review.js";
import Product from "../models/Product.js";

const updateProductRating = async (productId) => {

    const reviews = await Review.find({
        product: productId,
    });

    const reviewCount = reviews.length;

    const averageRating =
        reviewCount === 0
            ? 0
            : reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
              ) / reviewCount;

    await Product.findByIdAndUpdate(productId, {
        rating:averageRating,
        reviewCount,
    });

};

export const createReviewService = async (
    userId,
    reviewData
) => {

    // Prevent duplicate review
    const existingReview = await Review.findOne({
        user: userId,
        product: reviewData.product,
    });

    if (existingReview) {
        throw new Error("You have already reviewed this product.");
    }

    const review = await Review.create({

        user: userId,

        product: reviewData.product,

        rating: reviewData.rating,

        comment: reviewData.comment,

    });

    await updateProductRating(review.product);

    return review;

};

export const getProductReviewsService = async (
    productId
) => {

    const reviews = await Review.find({
        product: productId,
    })
        .populate("user", "name")
        .sort({
            createdAt: -1,
        });

    return reviews;

};

export const updateReviewService = async (
    userId,
    reviewId,
    reviewData
) => {

    const review = await Review.findOne({
        _id: reviewId,
        user: userId,
    });

    if (!review) {
        throw new Error("Review not found");
    }

    review.rating = reviewData.rating;
    review.comment = reviewData.comment;

    await review.save();

    await updateProductRating(review.product);

    return review;

};

export const deleteReviewService = async (
    userId,
    reviewId
) => {

    const review = await Review.findOne({
        _id: reviewId,
        user: userId,
    });

    if (!review) {
        throw new Error("Review not found");
    }

    const productId = review.product;

    await Review.findByIdAndDelete(reviewId);

    await updateProductRating(productId);

};