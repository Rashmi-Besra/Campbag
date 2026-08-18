import React, { useEffect, useState } from "react";

import SellerHeader from "../components/Seller/SellerHeader";
import SellerStats from "../components/Seller/SellerStats";

import DashboardCard from "../components/Seller/DashboardCard";

import SalesChart from "../components/Seller/SalesChart";
import RevenueChart from "../components/Seller/RevenueChart";

import OrderTable from "../components/Seller/OrderTable";
import ProductTable from "../components/Seller/ProductTable";

import { getMyProfile } from "../services/profileService";
import { getOrders } from "../services/orderService";
import {
    getMyProducts,
    deleteProduct
} from "../services/productService";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {

    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

     const navigate = useNavigate();

    const handleEdit = (product) => {
        navigate(`/seller/products/edit/${product._id}`);
    };

    useEffect(() => {

        const fetchSellerData = async () => {

            try {

                const profileResponse = await getMyProfile();

                console.log("SELLER PROFILE RESPONSE:", profileResponse);

                setProfile(
                    profileResponse.profile ||
                    profileResponse.user ||
                    profileResponse.data ||
                    null
                );


                const orderResponse = await getOrders();

                console.log("SELLER ORDER RESPONSE:", orderResponse);

                setOrders(
                    orderResponse.orders || []
                );

            } catch (error) {

                console.log(
                    "SELLER DASHBOARD ERROR:",
                    error
                );

            }

        };

        fetchSellerData();

    }, []);

    useEffect(() => {
  const fetchProducts = async () => {

            try {

                const data = await getMyProducts();

                console.log("MY PRODUCTS RESPONSE:", data);

                setProducts(data.products || []);

            } catch (error) {

                console.error(
                    "Failed to fetch seller products:",
                    error
                );

            }

        };

    fetchProducts();
}, []);

const handleDelete = async (product) => {

    const confirmed = window.confirm(
        `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteProduct(product._id);

        setProducts((previousProducts) =>
            previousProducts.filter(
                (item) => item._id !== product._id
            )
        );

    } catch (error) {

        console.error(
            "Failed to delete product:",
            error
        );

        alert("Failed to delete product.");

    }
};


    return (

        <div className="min-h-screen bg-gray-50">

            <SellerHeader profile={profile} />

            <main className="max-w-7xl mx-auto px-6 py-8">

                <SellerStats profile={profile} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    <DashboardCard title="Sales Overview">
                        <SalesChart orders={orders} />
                    </DashboardCard>

                    <DashboardCard title="Revenue Overview">
                        <RevenueChart orders={orders} />
                    </DashboardCard>

                </div>


                <div className="mt-8">

                    <DashboardCard title="Recent Orders">

                        <OrderTable orders={orders} />

                    </DashboardCard>

                </div>


                <div className="mt-8">

                    <DashboardCard title="My Products">

                        <ProductTable products={products}
                        onEdit={handleEdit}
    onDelete={handleDelete}/>

                    </DashboardCard>

                </div>

            </main>

        </div>

    );

};

export default SellerDashboard;