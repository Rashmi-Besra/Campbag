import React from "react";

const ProductTable = ({
    products = [],
    onEdit,
    onDelete
}) => {

    console.table(
    products.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        soldCount: product.soldCount,
        status: product.status,
    }))
);

    return (
        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>
                    <tr className="border-b text-left text-sm text-gray-500">

                        <th className="p-3">
                            Product
                        </th>

                        <th className="p-3">
                            Price
                        </th>

                        <th className="p-3">
                            Stock
                        </th>

                        <th className="p-3">
                            Sold
                        </th>

                        <th className="p-3">
                            Status
                        </th>

                        <th className="p-3">
                            Actions
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {products.length === 0 ? (

                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-8 text-gray-500"
                            >
                                No products yet
                            </td>
                        </tr>

                    ) : (

                        products.map((product) => {

                            const quantity =
                                product.quantity ?? 0;

                            const soldCount =
                                product.soldCount ?? 0;

                            const isOutOfStock =
                                quantity === 0;

                            return (
                                <tr
                                    key={product._id}
                                    className="border-b"
                                >

                                    {/* Product */}

                                    <td className="p-3">

                                        <div className="flex items-center gap-3">

                                            <img
                                                src={
                                                    product.images?.[0]?.url
                                                }
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />

                                            <span className="font-medium">
                                                {product.name}
                                            </span>

                                        </div>

                                    </td>


                                    {/* Price */}

                                    <td className="p-3">
                                        ₹{product.price}
                                    </td>


                                    {/* Stock */}

                                    <td className="p-3">
                                        {quantity}
                                    </td>


                                    {/* Sold */}

                                    <td className="p-3">
                                        {soldCount}
                                    </td>


                                    {/* Status */}

                                    <td className="p-3">

                                        <span
                                            className={
                                                isOutOfStock
                                                    ? "text-red-600 font-medium"
                                                    : "text-green-600 font-medium"
                                            }
                                        >
                                            {isOutOfStock
                                                ? "Out of Stock"
                                                : "Available"}
                                        </span>

                                    </td>


                                    {/* Actions */}

                                    <td className="p-3">

                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    onEdit(product)
                                                }
                                                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(product)
                                                }
                                                className="px-3 py-1 text-sm border rounded text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            );
                        })
                    )}

                </tbody>

            </table>

        </div>
    );
};

export default ProductTable;