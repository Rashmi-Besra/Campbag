import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "../components/Seller/LoadingSpinner";
import EmptyState from "../components/Seller/EmptyState";
import OrderTable from "../components/Seller/OrderTable";

import { getSellerOrders } from "../services/sellerService";

const SellerOrders = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const data = await getSellerOrders();

                setOrders(data.orders);

            } catch (error) {

                toast.error("Failed to load orders");

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, []);

    if (loading) return <LoadingSpinner />;

    if (orders.length === 0)
        return <EmptyState message="No Orders Yet" />;

    return (

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Seller Orders
            </h1>

            <OrderTable orders={orders} />

        </div>

    );

};

export default SellerOrders;