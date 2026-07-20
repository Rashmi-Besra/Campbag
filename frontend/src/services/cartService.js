import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get Cart
export const getCart = async () => {
  const { data } = await API.get("/api/cart");
  return data;
};

// Add Item
export const addToCart = async (productId, option, quantity = 1) => {
  const { data } = await API.post("/api/cart/add", {
    productId,
    option,
    quantity,
  });

  return data;
};

// Update Quantity
export const updateCart = async (productId, option, quantity) => {
  const { data } = await API.put("/api/cart/update", {
    productId,
    option,
    quantity,
  });

  return data;
};

// Clear Cart
export const clearCart = async () => {
  const { data } = await API.delete("/api/cart/clear");
  return data;
};