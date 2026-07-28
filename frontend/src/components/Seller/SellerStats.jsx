import React from "react";

const SellerStats = ({ seller }) => {
    const stats = [
        {
            title: "Trust Score",
            value: seller.trustScore,
        },
        {
            title: "Products Sold",
            value: seller.productsSold,
        },
        {
            title: "Active Listings",
            value: seller.activeProducts,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="bg-white shadow-md rounded-xl p-6 text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800">
                        {stat.value}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {stat.title}
                    </p>
                </div>
            ))}

        </div>
    );
};

export default SellerStats;