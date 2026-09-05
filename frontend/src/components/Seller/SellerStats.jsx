import React from "react";

const SellerStats = ({ dashboard }) => {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Total Products
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    {dashboard?.totalProducts ?? 0}
                </h2>

            </div>


            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Total Orders
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    {dashboard?.totalOrders ?? 0}
                </h2>

            </div>


            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Pending Orders
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    {dashboard?.pendingOrders ?? 0}
                </h2>

            </div>


            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Total Revenue
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    ₹{dashboard?.totalRevenue ?? 0}
                </h2>

            </div>

        </div>

    );

};

export default SellerStats;