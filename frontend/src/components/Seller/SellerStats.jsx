import React from "react";

const SellerStats = ({ profile }) => {

    console.log("SELLER STATS PROFILE:", profile);

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Trust Score
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    {profile?.trustScore ?? 0}
                </h2>

            </div>


            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Rating
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    {profile?.rating ?? 0}
                </h2>

            </div>


            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Total Sales
                </p>

                <h2 className="text-2xl font-semibold mt-2">
                    {profile?.totalSales ?? 0}
                </h2>

            </div>


            <div className="bg-white p-5 rounded-lg shadow-sm">

                <p className="text-sm text-gray-500">
                    Seller Status
                </p>

                <h2 className="text-2xl font-semibold mt-2">

                    {profile?.sellerVerified
                        ? "Verified"
                        : "Pending"}

                </h2>

            </div>

        </div>

    );

};

export default SellerStats;