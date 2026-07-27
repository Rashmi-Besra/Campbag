import api from "../api/api";


console.log(import.meta.env.VITE_BACKEND_URL);


// Automatically attach JWT token


// Get Cart
export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

// Add Item
export const addToCart = async (productId, option, quantity = 1) => {
  const { data } = await api.post("/cart/add", {
    productId,
    option,
    quantity,
  });

  return data;
};

// Update Quantity
export const updateCart = async (productId, option, quantity) => {
  const { data } = await api.put("/cart/update", {
    productId,
    option,
    quantity,
  });

  return data;
};

// Clear Cart
export const clearCart = async () => {
  const { data } = await api.delete("/cart/clear");
  return data;
};

