import React, { useEffect, useState } from "react";

import SellerHeader from "../components/Seller/SellerHeader";
import SellerStats from "../components/Seller/SellerStats";
import DashboardCard from "../components/Seller/DashboardCard";

import SalesChart from "../components/Seller/SalesChart";
import RevenueChart from "../components/Seller/RevenueChart";

import OrderTable from "../components/Seller/OrderTable";
import ProductTable from "../components/Seller/ProductTable";

import { getMyProfile } from "../services/profileService";
import { getSellerOrders } from "../services/orderService";

import {
    getMyProducts,
    deleteProduct
} from "../services/productService";

import { getDashboard } from "../services/sellerService";

import { useNavigate } from "react-router-dom";


const SellerDashboard = () => {

    const [profile, setProfile] = useState(null);

    const [orders, setOrders] = useState([]);

    const [products, setProducts] = useState([]);

    const [dashboard, setDashboard] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

    const navigate = useNavigate();


    /* ---------------- Edit Product ---------------- */

    const handleEdit = (product) => {

        navigate(
            `/seller/products/edit/${product._id}`
        );

    };


    /* ---------------- Fetch Dashboard Data ---------------- */

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response =
                    await getDashboard();

                console.log(
                    "SELLER DASHBOARD:",
                    response
                );

                setDashboard(
                    response.dashboard || null
                );

            } catch (error) {

                console.error(
                    "Failed to fetch dashboard:",
                    error
                );

            }

        };

        fetchDashboard();

    }, []);


    /* ---------------- Fetch Profile + Orders ---------------- */

    useEffect(() => {

        const fetchSellerData = async () => {

            try {

                /* ---------- Profile ---------- */

                const profileResponse =
                    await getMyProfile();

                console.log(
                    "SELLER PROFILE RESPONSE:",
                    profileResponse
                );

                setProfile(
                    profileResponse.profile ||
                    profileResponse.user ||
                    profileResponse.data ||
                    null
                );


                /* ---------- Orders ---------- */

                const orderResponse =
                    await getSellerOrders();

                console.log(
                    "SELLER ORDER RESPONSE:",
                    orderResponse
                );

                setOrders(
                    orderResponse.orders || []
                );

            } catch (error) {

                console.error(
                    "SELLER DASHBOARD ERROR:",
                    error
                );

            }

        };

        fetchSellerData();

    }, []);


    /* ---------------- Fetch Products ---------------- */

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data =
                    await getMyProducts();

                console.log(
                    "MY PRODUCTS RESPONSE:",
                    data
                );

               const sellerProducts = data.products || [];

sellerProducts.forEach((product) => {
    console.log(
        "PRODUCT:",
        product.name,
        "QUANTITY:",
        product.quantity,
        "SOLD COUNT:",
        product.soldCount,
        "STATUS:",
        product.status
    );
});

setProducts(sellerProducts);

            } catch (error) {

                console.error(
                    "Failed to fetch seller products:",
                    error
                );

            }

        };

        fetchProducts();

    }, []);


    /* ---------------- Delete Product ---------------- */

    const handleDelete = async (product) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${product.name}"?`
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteProduct(
                product._id
            );

            setProducts(
                (previousProducts) =>
                    previousProducts.filter(
                        (item) =>
                            item._id !== product._id
                    )
            );

        } catch (error) {

            console.error(
                "Failed to delete product:",
                error
            );

            alert(
                "Failed to delete product."
            );

        }

    };

    const filteredProducts = products.filter((product) => {

    const matchesSearch =
        product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

    const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

    return matchesSearch && matchesStatus;
});
    /* ---------------- UI ---------------- */

    return (

        <div className="min-h-screen bg-gray-50">

            <SellerHeader
                profile={profile}
            />


            <main className="max-w-7xl mx-auto px-6 py-8">


                {/* ---------- Stats ---------- */}

                <SellerStats
                    dashboard={dashboard}
                />


                {/* ---------- Charts ---------- */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    <DashboardCard
                        title="Sales Overview"
                    >

                        <SalesChart
                            orders={orders}
                        />

                    </DashboardCard>


                    <DashboardCard
                        title="Revenue Overview"
                    >

                        <RevenueChart
                            orders={orders}
                        />

                    </DashboardCard>

                </div>


                {/* ---------- Recent Orders ---------- */}

                <div className="mt-8">

                   <DashboardCard title="Recent Orders">

    <OrderTable
        orders={dashboard?.recentOrders || []}
    />

    <div className="flex justify-end mt-4">

        <button
            onClick={() => navigate("/seller/orders")}
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
        >
            View All Orders
        </button>

    </div>

</DashboardCard>

                </div>


                {/* ---------- Products ---------- */}

                <div className="mt-8">

                    <DashboardCard
                        title="My Products"
                    >

      <div className="flex flex-col md:flex-row gap-3 mb-5">

    <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) =>
            setSearchTerm(e.target.value)
        }
        className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300"
    />

    <select
        value={statusFilter}
        onChange={(e) =>
            setStatusFilter(e.target.value)
        }
        className="border rounded-lg px-4 py-2 bg-white"
    >
        <option value="All">All Products</option>
        <option value="Available">Available</option>
        <option value="Sold">Sold</option>
    </select>

</div>

<ProductTable
    products={filteredProducts}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

                    </DashboardCard>

                </div>


            </main>

        </div>

    );

};


export default SellerDashboard;