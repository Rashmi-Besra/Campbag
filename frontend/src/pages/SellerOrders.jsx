import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../components/Seller/LoadingSpinner";
import EmptyState from "../components/Seller/EmptyState";
import OrderTable from "../components/Seller/OrderTable";

import { getSellerOrders } from "../services/orderService";

const SellerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");


    const fetchOrders = async () => {

        try {

            const data = await getSellerOrders();

            setOrders(data.orders || []);

        } catch (error) {

            console.error("Failed to load seller orders:", error);

            toast.error("Failed to load orders");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

const filteredOrders = orders.filter((order) => {

    const searchText = search
        .trim()
        .toLowerCase()
        .replace("#", "");

    const orderId =
        order._id?.toLowerCase() || "";

    const shortOrderId =
        order._id?.slice(-6).toLowerCase() || "";

    const buyerName =
        order.user?.name?.toLowerCase() || "";

    const matchesSearch =
        orderId.includes(searchText) ||
        shortOrderId.includes(searchText) ||
        buyerName.includes(searchText);

    const matchesStatus =
        statusFilter === "All" ||
        order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;

});

{filteredOrders.length === 0 ? (
    <EmptyState message="No Matching Orders Found" />
) : (
    <OrderTable orders={filteredOrders} />
)}



    if (loading) {
        return <LoadingSpinner />;
    }

      // No orders exist at all
    if (orders.length === 0) {
        return <EmptyState message="No Orders Yet" />;
    }
    

return (
    <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
            Seller Orders
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

            <input
                type="text"
                placeholder="Search by order ID or buyer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-lg px-4 py-3 outline-none"
            >
                <option value="All">All Orders</option>
                <option value="Placed">Placed</option>
                <option value="Accepted">Accepted</option>
                <option value="Packed">Packed</option>
                <option value="Out for Delivery">
                    Out for Delivery
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </select>

        </div>

        {/* Orders */}

        {filteredOrders.length === 0 ? (

            <EmptyState title="No Matching Orders Found"
    message="Try changing your search or filter." />

        ) : (

            <OrderTable
                orders={filteredOrders}
            />

        )}

    </div>
);

};

export default SellerOrders;