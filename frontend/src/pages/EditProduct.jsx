import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProductForm from "../components/seller/ProductForm";

import {
    getSellerProductById,
    updateProduct,
} from "../services/sellerService";

const EditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const data = await getSellerProductById(id);

                setProduct(data.product);

            } catch (error) {

                console.error(error);

                toast.error("Failed to load product.");

            } finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);

    const handleUpdate = async (formData) => {

        try {

            const response = await updateProduct(id, formData);

            if (response.success) {

                toast.success(response.message);

                navigate("/seller/products");

            }

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Update failed"
            );

        }

    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">

            <h1 className="text-3xl font-bold mb-8">
                Edit Product
            </h1>

            <ProductForm
                initialData={product}
                onSubmit={handleUpdate}
                submitButtonText="Update Product"
            />

        </div>
    );

};

export default EditProduct;