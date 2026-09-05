import React, { useEffect,useState } from "react";
import { updateOrderStatus } from "../../services/orderService";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ orders = [] }) => {

    const [updatingId, setUpdatingId] = useState(null);

    const [localOrders, setLocalOrders] = useState(orders);

    const navigate = useNavigate();

    useEffect(() => {

    setLocalOrders(orders);

}, [orders]);

    /* ---------------- Next Status ---------------- */

    const getNextStatus = (status) => {

        const nextStatuses = {

            Placed: "Accepted",

            Accepted: "Packed",

            Packed: "Out for Delivery",

            "Out for Delivery": "Delivered",

        };

        return nextStatuses[status] || null;

    };


    /* ---------------- Action Text ---------------- */

    const getActionText = (nextStatus) => {

        if (nextStatus === "Accepted") {
            return "Accept Order";
        }

        if (nextStatus === "Packed") {
            return "Pack Order";
        }

        if (nextStatus === "Out for Delivery") {
            return "Dispatch";
        }

        if (nextStatus === "Delivered") {
            return "Mark Delivered";
        }

        return "";

    };


    /* ---------------- Update Status ---------------- */

    const handleStatusUpdate = async (
        orderId,
        currentStatus
    ) => {

        const nextStatus =
            getNextStatus(currentStatus);

        if (!nextStatus) {
            return;
        }

        try {

            setUpdatingId(orderId);

            const response =
                await updateOrderStatus(
                    orderId,
                    nextStatus
                );

            console.log(
                "ORDER STATUS UPDATED:",
                response
            );


            /* Update only this order */

            setLocalOrders(
                (previousOrders) =>
                    previousOrders.map(
                        (order) =>
                            order._id === orderId
                                ? {
                                      ...order,
                                      orderStatus:
                                          response.order
                                              ?.orderStatus ||
                                          nextStatus,
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


    /* ---------------- Render ---------------- */

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                {/* ---------- Header ---------- */}

                <thead>

                    <tr className="border-b text-left text-sm text-gray-500">

                        <th className="px-4 py-3">
                            Order
                        </th>

                        <th className="px-4 py-3">
                            Buyer
                        </th>

                        <th className="px-4 py-3">
                            Date
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


                {/* ---------- Body ---------- */}

                <tbody>

                    {localOrders.map((order) => {

                        const nextStatus =
                            getNextStatus(
                                order.orderStatus
                            );


                        return (

                            <tr
                                key={order._id}
                                className="border-b hover:bg-gray-50"
                            >

                                {/* Order ID */}

                                <td className="px-4 py-4">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/seller/orders/${order._id}`
                                            )
                                        }
                                        className="font-medium hover:underline"
                                    >

                                        #
                                        {order._id.slice(-6)}

                                    </button>

                                </td>


                                {/* Buyer */}

                                <td className="px-4 py-4">

                                    <div>

                                        <p className="font-medium">

                                            {order.user?.name ||
                                                "Unknown"}

                                        </p>

                                        {order.user?.collegeEmail && (

                                            <p className="text-xs text-gray-500">

                                                {
                                                    order.user
                                                        .collegeEmail
                                                }

                                            </p>

                                        )}

                                    </div>

                                </td>


                                {/* Date */}

                                <td className="px-4 py-4 text-sm text-gray-600">

                                    {order.createdAt
                                        ? new Date(
                                              order.createdAt
                                          ).toLocaleDateString(
                                              "en-IN",
                                              {
                                                  day: "numeric",
                                                  month: "short",
                                                  year: "numeric",
                                              }
                                          )
                                        : "-"}

                                </td>


                                {/* Amount */}

                                <td className="px-4 py-4 font-medium">

                                    ₹
                                    {Number(
                                        order.totalAmount || 0
                                    ).toLocaleString("en-IN")}

                                </td>


                                {/* Status */}

                                <td className="px-4 py-4">

                                    <span
                                        className={`
                                            text-sm font-medium
                                            ${
                                                order.orderStatus ===
                                                "Cancelled"
                                                    ? "text-red-500"
                                                    : order.orderStatus ===
                                                      "Delivered"
                                                    ? "text-green-600"
                                                    : order.orderStatus ===
                                                      "Out for Delivery"
                                                    ? "text-blue-600"
                                                    : "text-gray-700"
                                            }
                                        `}
                                    >

                                        {order.orderStatus}

                                    </span>

                                </td>


                                {/* Action */}

                                <td className="px-4 py-4">

                                    {nextStatus ? (

                                        <button
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    order._id,
                                                    order.orderStatus
                                                )
                                            }
                                            disabled={
                                                updatingId ===
                                                order._id
                                            }
                                            className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
                                        >

                                            {updatingId ===
                                            order._id
                                                ? "Updating..."
                                                : getActionText(
                                                      nextStatus
                                                  )}

                                        </button>

                                    ) : (

                                        <span
                                            className={`
                                                text-sm font-medium
                                                ${
                                                    order.orderStatus ===
                                                    "Cancelled"
                                                        ? "text-red-500"
                                                        : "text-green-600"
                                                }
                                            `}
                                        >

                                            {order.orderStatus ===
                                            "Cancelled"
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


            {/* ---------- Empty State ---------- */}

            {localOrders.length === 0 && (

                <div className="p-8 text-center">

                    <p className="text-gray-500">
                        No recent orders yet.
                    </p>

                </div>

            )}

        </div>

    );

};

export default OrderTable;