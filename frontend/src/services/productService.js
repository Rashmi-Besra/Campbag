import api from "../api/api";


export const getMyProducts = async () => {

    const response = await api.get(
        "/product/my-products"
    );

    console.log(
        "GET MY PRODUCTS API RESPONSE:",
        response.data
    );

    return response.data;
};

export const addProduct = async (productData) => {
    const response = await api.post(
        "/product/add",
        productData
    );

    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(
        `/product/${id}`,
        productData
    );

    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(
        `/product/${id}`
    );

    return response.data;
};