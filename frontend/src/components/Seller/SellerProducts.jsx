import React from "react";
import ProductItem from "../ProductItems";

const SellerProducts = ({ products }) => {
    return (
        <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
                Products by Seller
            </h2>

            {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500">
                        This seller has no active products.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                    {products.map((product) => (
                        <ProductItem
                            key={product._id}
                            id={product._id}
                            image={product.images}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                        />
                    ))}

                </div>
            )}

        </div>
    );
};

export default SellerProducts;