import { useEffect, useState } from "react";
import { getSellerProducts } from "../services/sellerService";
import ProductTable from "../components/seller/ProductTable";
import LoadingSpinner from "../components/seller/LoadingSpinner";
import EmptyState from "../components/seller/EmptyState";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getSellerProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {

    await deleteProduct(id);

    setProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product._id !== id
      )
    );

  } catch (error) {

    console.error(error);

  }

};

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="text-gray-500 mt-1">
            Manage all your listed products.
          </p>
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default SellerProducts;