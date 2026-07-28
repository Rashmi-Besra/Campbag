import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Get seller profile
export const getSellerProfile = async (sellerId) => {
    try {
        const { data } = await axios.get(
            `${API_URL}/api/seller/${sellerId}`
        );

        return data;
    } catch (error) {
        console.error("Error fetching seller profile:", error);

        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong.",
            }
        );
    }
};

// Get seller products
export const getSellerProducts = async (sellerId) => {
    try {
        const { data } = await axios.get(
            `${API_URL}/api/seller/${sellerId}/products`
        );

        return data;
    } catch (error) {
        console.error("Error fetching seller products:", error);

        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong.",
            }
        );
    }
};