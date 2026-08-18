import api from "../api/api";

// Dashboard
export const getDashboard = async () => {
    const response = await api.get("/seller/dashboard");
    return response.data;
};


// Get seller's products
export const getMyProducts = async () => {

    const response = await api.get(
        "/product/my-products"
    );

    return response.data;
};


// Create product
export const createProduct = async (formData) => {

    const response = await api.post(
        "/product/add",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


// Get single seller product
export const getSellerProductById = async (id) => {

    const response = await api.get(
        `/product/${id}`
    );

    return response.data;
};


// Update product
export const updateProduct = async (id, formData) => {

    const response = await api.put(
        `/product/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


// Delete product
export const deleteProduct = async (id) => {

    const response = await api.delete(
        `/product/${id}`
    );

    return response.data;
};