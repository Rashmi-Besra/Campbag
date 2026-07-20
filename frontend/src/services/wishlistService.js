import api from "../api/api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get Wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlist", getAuthConfig());
  return response.data;
};

// Add Product
export const addToWishlist = async (productId) => {
  const response = await api.post(
    "/wishlist/add",
    { productId },
    getAuthConfig()
  );

  return response.data;
};

// Remove Product
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(
    `/wishlist/remove/${productId}`,
    getAuthConfig()
  );

  return response.data;
};