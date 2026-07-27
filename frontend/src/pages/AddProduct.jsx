import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductForm from "../components/seller/ProductForm";
import { createProduct } from "../services/sellerService";

const AddProduct = () => {

  const navigate = useNavigate();

  const handleAddProduct = async (formData) => {

    try {

      const response = await createProduct(formData);

      if (response.success) {

        toast.success(response.message);

        navigate("/seller/products");

      } else {

        toast.error(response.message);

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to add product"
      );

    }

  };

  return (

    <div className="max-w-5xl mx-auto py-10 px-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Add Product
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the product details below.
        </p>

      </div>

      <ProductForm
        onSubmit={handleAddProduct}
        submitButtonText="Add Product"
      />

    </div>

  );

};

export default AddProduct;