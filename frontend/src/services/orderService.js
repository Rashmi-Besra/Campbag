import api from "../api/api";

// Automatically attach JWT token


// Place Order
export const placeOrder = async (orderData) => {

    const { data } = await api.post(
        "/order/place",
        orderData
    );

    return data;
};

// Get Orders
export const getOrders = async () => {

    const { data } = await api.get("/order");

    return data;
};