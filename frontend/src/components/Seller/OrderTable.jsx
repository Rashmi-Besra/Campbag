import React, { useEffect, useState } from "react";
import {
    getSellerOrders,
    updateOrderStatus,
} from "../../services/orderService";

const OrderTable = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchOrders = async () => {

        try {

            const data = await getSellerOrders();

            setOrders(data.orders || []);

        } catch (error) {

            console.error(
                "Failed to fetch seller orders:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getNextStatus = (status) => {

        const nextStatuses = {
            Placed: "Accepted",
            Accepted: "Packed",
            Packed: "Out for Delivery",
            "Out for Delivery": "Delivered",
        };

        return nextStatuses[status] || null;
    };

    const handleStatusUpdate = async (orderId, currentStatus) => {

        const nextStatus = getNextStatus(currentStatus);

        if (!nextStatus) return;

        try {

            setUpdatingId(orderId);

            const data = await updateOrderStatus(
                orderId,
                nextStatus
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? {
                              ...order,
                              orderStatus:
                                  data.order.orderStatus,
                          }
                        : order
                )
            );

        } catch (error) {

            console.error(
                "Failed to update order:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update order status."
            );

        } finally {

            setUpdatingId(null);

        }
    };

    if (loading) {
        return <p className="p-6">Loading orders...</p>;
    }

    return (
        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>
                    <tr className="border-b text-left text-sm text-gray-500">

                        <th className="px-4 py-3">
                            Order
                        </th>

                        <th className="px-4 py-3">
                            Buyer
                        </th>

                        <th className="px-4 py-3">
                            Amount
                        </th>

                        <th className="px-4 py-3">
                            Status
                        </th>

                        <th className="px-4 py-3">
                            Action
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {orders.map((order) => {

                        const nextStatus =
                            getNextStatus(
                                order.orderStatus
                            );

                        return (
                            <tr
                                key={order._id}
                                className="border-b"
                            >

                                <td className="px-4 py-4">
                                    #{order._id.slice(-6)}
                                </td>

                                <td className="px-4 py-4">
                                    {order.user?.name ||
                                        "Unknown"}
                                </td>

                                <td className="px-4 py-4">
                                    ₹{order.totalAmount}
                                </td>

                                <td className="px-4 py-4">
                                    {order.orderStatus}
                                </td>

                                <td className="px-4 py-4">

                                   {nextStatus ? (

    <button
        onClick={() =>
            handleStatusUpdate(
                order._id,
                order.orderStatus
            )
        }
        disabled={updatingId === order._id}
        className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
    >
       {updatingId === order._id
    ? "Updating..."
    : nextStatus === "Accepted"
        ? "Accept Order"
        : nextStatus === "Packed"
            ? "Pack Order"
            : nextStatus === "Out for Delivery"
                ? "Dispatch"
                : "Mark Delivered"}
    </button>

) : (

    <span
        className={`text-sm font-medium ${
            order.orderStatus === "Cancelled"
                ? "text-red-500"
                : "text-green-600"
        }`}
    >
        {order.orderStatus === "Cancelled"
            ? "Cancelled"
            : "Completed"}
    </span>

)}

                                </td>

                            </tr>
                        );

                    })}

                </tbody>

            </table>

            {orders.length === 0 && (
                <p className="p-6 text-center text-gray-500">
                    No orders yet.
                </p>
            )}

        </div>
    );
};

export default OrderTable;