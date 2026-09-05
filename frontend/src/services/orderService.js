import api from "../api/api";

// ===============================
// Buyer Orders
// ===============================

// Place Order
export const placeOrder = async (orderData) => {

    const response = await api.post(
        "/order",
        orderData
    );

    return response.data;
};


// Get My Orders
export const getOrders = async () => {

    const response = await api.get(
        "/order"
    );

    return response.data;
};


// Alias used by Product.jsx
export const getMyOrders = async () => {

    const response = await api.get(
        "/order"
    );

    return response.data;
};


// Get Single Order
export const getSingleOrder = async (id) => {

    const response = await api.get(
        `/order/${id}`
    );

    return response.data;
};


// Cancel Order
export const cancelOrder = async (id) => {

    const response = await api.patch(
        `/order/${id}/cancel`
    );

    return response.data;
};


// ===============================
// Seller Orders
// ===============================

// Get Seller Orders
export const getSellerOrders = async () => {

    const response = await api.get(
        "/order/seller"
    );

    return response.data;
};


// Update Order Status
export const updateOrderStatus = async (
    id,
    status
) => {

    const response = await api.patch(
        `/order/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};


// Get Seller Single Order
export const getSellerSingleOrder = async (id) => {

    const response = await api.get(
        `/order/seller/${id}`
    );

    return response.data;
};