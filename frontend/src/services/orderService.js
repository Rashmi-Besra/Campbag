import api from "../api/api";

// Automatically attach JWT token


// Place Order
export const placeOrder = async (orderData) => {

    const response = await api.post(
        "/order",
        orderData
    );

    return response.data;
};

// Get Orders
export const getOrders = async () => {

    const { data } = await api.get("/order");

    return data;
};

export const getSingleOrder = async (id) => {

    const response = await api.get(
        `/order/${id}`
    );

    return response.data;

};

export const cancelOrder = async (id) => {

    const response = await api.patch(
        `/order/${id}/cancel`
    );

    return response.data;

};

export const getSellerOrders = async () => {

    const response = await api.get("/order/seller");

    return response.data;

};
export const updateOrderStatus = async (id, status) => {
    const response = await api.patch(
        `/order/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};