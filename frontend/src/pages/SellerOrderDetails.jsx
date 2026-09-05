import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getSellerSingleOrder,
    updateOrderStatus,
} from "../services/orderService";

const SellerOrderDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const data = await getSellerSingleOrder(id);

                setOrder(data.order);

            } catch (error) {

                console.error(
                    "Failed to fetch seller order:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch order."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchOrder();

    }, [id]);


    // ==========================================
    // Get Next Valid Status
    // ==========================================

    const getNextStatus = () => {

        if (!order) return null;

        const transitions = {

            Placed: "Accepted",

            Accepted: "Packed",

            Packed: "Out for Delivery",

            "Out for Delivery": "Delivered",

        };

        return transitions[order.orderStatus] || null;
    };


    // ==========================================
    // Update Order Status
    // ==========================================

    const handleStatusUpdate = async () => {

        const nextStatus = getNextStatus();

        if (!nextStatus) return;

        try {

            setUpdatingStatus(true);

            const data = await updateOrderStatus(
                order._id,
                nextStatus
            );

            setOrder(data.order);

            toast.success(
                `Order marked as "${nextStatus}".`
            );

        } catch (error) {

            console.error(
                "Failed to update order status:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update order status."
            );

        } finally {

            setUpdatingStatus(false);

        }

    };


    if (loading) {

        return (
            <p className="p-6 text-center">
                Loading order...
            </p>
        );

    }


    if (!order) {

        return (

            <div className="p-6 text-center">

                <p className="text-gray-500">
                    Order not found.
                </p>

                <button
                    onClick={() =>
                        navigate("/seller/orders")
                    }
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
                >
                    Back to Orders
                </button>

            </div>

        );

    }


    const nextStatus = getNextStatus();


    return (

        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* ===================================== */}
            {/* Header */}
            {/* ===================================== */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold">
                        Order Details
                    </h1>

                    <p className="text-gray-500 mt-1">
                        #{order._id.slice(-6)}
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/seller/orders")
                    }
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                    Back
                </button>

            </div>


            {/* ===================================== */}
            {/* Order Status */}
            {/* ===================================== */}

            <div className="bg-white rounded-xl shadow p-6 mb-6">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Order Status
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Current Status
                        </p>

                        <span className="inline-block mt-2 px-4 py-2 rounded-full bg-gray-100 font-medium">
                            {order.orderStatus}
                        </span>

                    </div>


                    {/* Next Status Button */}

                    {nextStatus && order.orderStatus !== "Cancelled" && (

                        <button
                            onClick={handleStatusUpdate}
                            disabled={updatingStatus}
                            className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >

                            {updatingStatus
                                ? "Updating..."
                                : nextStatus === "Accepted"
                                ? "Accept Order"
                                : nextStatus === "Packed"
                                ? "Mark as Packed"
                                : nextStatus === "Out for Delivery"
                                ? "Mark Out for Delivery"
                                : "Mark as Delivered"
                            }

                        </button>

                    )}

                </div>


                {/* Cancelled */}

                {order.orderStatus === "Cancelled" && (

                    <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600">

                        This order was cancelled by the buyer.

                    </div>

                )}


                {/* Delivered */}

                {order.orderStatus === "Delivered" && (

                    <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700">

                        This order has been delivered successfully.

                    </div>

                )}

            </div>


            {/* ===================================== */}
            {/* Buyer */}
            {/* ===================================== */}

            <div className="bg-white rounded-xl shadow p-6 mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    Buyer Information
                </h2>

                <div className="flex items-center gap-4">

                    {order.user?.profileImage && (

                        <img
                            src={order.user.profileImage}
                            alt={order.user.name}
                            className="w-14 h-14 rounded-full object-cover"
                        />

                    )}

                    <div>

                        <p className="font-medium">
                            {order.user?.name || "Unknown"}
                        </p>

                        <p className="text-gray-500 text-sm">
                            {order.user?.email || ""}
                        </p>

                    </div>

                </div>

            </div>


            {/* ===================================== */}
            {/* Products */}
            {/* ===================================== */}

            <div className="bg-white rounded-xl shadow p-6 mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    Products
                </h2>

                <div className="space-y-4">

                    {order.items.map((item) => (

                        <div
                            key={item._id}
                            className="flex items-center justify-between border-b pb-4"
                        >

                            <div className="flex items-center gap-4">

                                {item.product?.images?.[0]?.url && (

                                    <img
                                        src={
                                            item.product.images[0].url
                                        }
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />

                                )}

                                <div>

                                    <p className="font-medium">
                                        {item.product?.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>

                                </div>

                            </div>

                            <p className="font-medium">
                                ₹{item.price * item.quantity}
                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* ===================================== */}
            {/* Payment + Delivery */}
            {/* ===================================== */}

            <div className="grid md:grid-cols-2 gap-6 mb-6">

                {/* Payment */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Payment
                    </h2>

                    <p>
                        Method:{" "}
                        <span className="font-medium">
                            {order.paymentMethod}
                        </span>
                    </p>

                    <p className="mt-2">
                        Status:{" "}
                        <span className="font-medium">
                            {order.paymentStatus}
                        </span>
                    </p>

                </div>


                {/* Delivery */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Delivery
                    </h2>

                    <p>
                        Method:{" "}
                        <span className="font-medium">
                            {order.deliveryMethod}
                        </span>
                    </p>

                    {order.deliveryDetails?.address && (

                        <p className="mt-2">
                            Address:{" "}
                            {order.deliveryDetails.address}
                        </p>

                    )}

                    {order.deliveryDetails?.phone && (

                        <p className="mt-2">
                            Phone:{" "}
                            {order.deliveryDetails.phone}
                        </p>

                    )}

                    {order.deliveryDetails?.instructions && (

                        <p className="mt-2">
                            Instructions:{" "}
                            {order.deliveryDetails.instructions}
                        </p>

                    )}

                </div>

            </div>


            {/* ===================================== */}
            {/* Order Summary */}
            {/* ===================================== */}

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between mb-2">

                    <span>
                        Delivery Fee
                    </span>

                    <span>
                        ₹{order.deliveryFee}
                    </span>

                </div>


                <div className="flex justify-between text-xl font-bold border-t pt-4">

                    <span>
                        Total
                    </span>

                    <span>
                        ₹{order.totalAmount}
                    </span>

                </div>

            </div>

        </div>

    );

};

export default SellerOrderDetails;