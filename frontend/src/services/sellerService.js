import api from "../api/api";

export const getDashboard = async () => {
    const response = await api.get("/seller/dashboard");
    return response.data;
};

export const getSellerProducts = async () => {
    const response = await api.get("/seller/products");
    return response.data;
};


export const createProduct = async (formData) => {

    const response = await api.post(
        "/seller/product",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};

export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/seller/product/${id}`
  );

  return response.data;
};

export const getSellerProductById = async (id) => {

    const response = await api.get(`/seller/product/${id}`);

    return response.data;

};

export const updateProduct = async (id, formData) => {

    const response = await api.put(
        `/seller/product/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};

export const getSellerOrders = async () => {

    const response = await api.get("/seller/orders");

    return response.data;

};

export const updateOrderStatus = async (

    id,

    status

) => {

    const response = await api.patch(

        `/seller/order/${id}/status`,

        { status }

    );

    return response.data;

};