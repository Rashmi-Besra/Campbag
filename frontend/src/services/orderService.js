import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Place Order
export const placeOrder = async () => {

    const { data } = await API.post("/api/order/place");

    return data;
};

// Get Orders
export const getOrders = async () => {

    const { data } = await API.get("/api/order");

    return data;
};