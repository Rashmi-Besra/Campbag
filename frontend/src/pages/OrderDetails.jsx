import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOrder } from "../services/orderService";
import OrderTracker from "../components/OrderTracker";

const statuses = [
    "Placed",
    "Accepted",
    "Packed",
    "Out for Delivery",
    "Delivered",
];

const OrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const response =
                    await getSingleOrder(id);

                setOrder(response.order);

            } catch (error) {

                console.error(
                    "Failed to fetch order:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load order."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchOrder();

    }, [id]);


    if (loading) {

        return (
            <div className="py-20 text-center">
                Loading order...
            </div>
        );

    }


    if (error || !order) {

        return (
            <div className="py-20 text-center">

                <p className="text-red-500 mb-4">
                    {error || "Order not found."}
                </p>

                <button
                    onClick={() => navigate("/orders")}
                    className="border px-4 py-2 rounded"
                >
                    Back to Orders
                </button>

            </div>
        );

    }


    const currentIndex =
        statuses.indexOf(order.orderStatus);


    return (

        <div className="border-t pt-16">

            <div className="max-w-5xl mx-auto px-4">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-2xl font-semibold">
                            Order Details
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Order #{order._id.slice(-6)}
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/orders")}
                        className="border px-4 py-2 rounded"
                    >
                        Back to Orders
                    </button>

                </div>


                {/* Status */}

                {order.orderStatus === "Cancelled" ? (

                    <div className="border rounded-lg p-6 mb-8">

                        <h2 className="text-lg font-semibold text-red-500">
                            Order Cancelled
                        </h2>

                        <p className="text-gray-500 mt-2">
                            This order has been cancelled.
                        </p>

                    </div>

                ) : (

                    <div className="border rounded-lg p-6 mb-8">

                        <h2 className="text-lg font-semibold mb-6">
                            Order Status
                        </h2>

<div className="w-full mt-6">
    <OrderTracker
        status={order.orderStatus}
    />
</div>

                    </div>

                )}


                {/* Products */}

                <div className="border rounded-lg p-6 mb-8">

                    <h2 className="text-lg font-semibold mb-4">
                        Products
                    </h2>

                    {order.items.map(
                        (item, index) => (

                            <div
                                key={index}
                                className="flex gap-4 py-4 border-b last:border-b-0"
                            >

                                <img
                                    src={
                                        item.product
                                            ?.images?.[0]?.url
                                    }
                                    alt={
                                        item.product?.name
                                    }
                                    className="w-20 h-20 object-cover rounded"
                                />

                                <div>

                                    <p className="font-medium">
                                        {item.product?.name}
                                    </p>

                                    <p className="text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>

                                    <p className="text-gray-500">
                                        Price: ₹{item.price}
                                    </p>

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* Order Information */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="border rounded-lg p-6">

                        <h2 className="font-semibold mb-4">
                            Delivery Information
                        </h2>

                        <p>
                            Method:{" "}
                            {order.deliveryMethod}
                        </p>

                        <p className="mt-2">
                            Seller:{" "}
                            {order.seller?.name}
                        </p>

                    </div>


                    <div className="border rounded-lg p-6">

                        <h2 className="font-semibold mb-4">
                            Payment Information
                        </h2>

                        <p>
                            Method:{" "}
                            {order.paymentMethod}
                        </p>

                        <p className="mt-2">
                            Status:{" "}
                            {order.paymentStatus}
                        </p>

                        <p className="mt-2 font-semibold">
                            Total: ₹{order.totalAmount}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default OrderDetails;