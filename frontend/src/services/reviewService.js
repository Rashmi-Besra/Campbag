import api from "../api/api";
import axios from "axios";

const API_URL = "http://localhost:4000/api/reviews";
export const getProductReviews = async (productId) => {

    const response = await axios.get(
        `${API_URL}/product/${productId}`
    );

    return response.data;
};
export const createReview = async (reviewData) => {

    const response = await api.post(
        "/reviews",
        reviewData
    );

    return response.data;
};

export const updateReview = async (
    reviewId,
    reviewData
) => {

    const response = await api.put(
        `/reviews/${reviewId}`,
        reviewData
    );

    return response.data;
};

export const deleteReview = async (
    reviewId
) => {

    const response = await api.delete(
        `/reviews/${reviewId}`
    );

    return response.data;
};