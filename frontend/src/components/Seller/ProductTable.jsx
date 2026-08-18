import React from "react";

const ProductTable = ({
    products = [],
    onEdit,
    onDelete
}) => {

    console.log("SELLER PRODUCTS:", products);

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>
                    <tr className="border-b text-left">

                        <th className="p-3">Product</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>

                    </tr>
                </thead>

                <tbody>

                    {products.length === 0 ? (

                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-8 text-gray-500"
                            >
                                No products yet
                            </td>
                        </tr>

                    ) : (

                        products.map((product) => (

                            <tr
                                key={product._id}
                                className="border-b"
                            >

                                <td className="p-3">

                                    <div className="flex items-center gap-3">

                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />

                                        <span>
                                            {product.name}
                                        </span>

                                    </div>

                                </td>

                                <td className="p-3">
                                    ₹{product.price}
                                </td>

                                <td className="p-3">
                                    {product.quantity}
                                </td>

                                <td className="p-3">
                                    {product.status}
                                </td>

                                <td className="p-3">

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => onEdit(product)}
                                            className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(product)}
                                            className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default ProductTable;