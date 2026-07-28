import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SellerHeader = ({ seller }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <div className="flex flex-col md:flex-row items-center gap-6">

                {/* Profile Image */}
                <img
                    src={
                        seller.profileImage ||
                        "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(seller.name)
                    }
                    alt={seller.name}
                    className="w-28 h-28 rounded-full object-cover border"
                />

                {/* Seller Details */}
                <div className="flex-1">

                    <div className="flex items-center gap-2">

                        <h1 className="text-3xl font-bold">
                            {seller.name}
                        </h1>

                        {seller.sellerVerified && (
                            <FaCheckCircle
                                className="text-blue-500"
                                size={20}
                            />
                        )}

                    </div>

                    <p className="text-gray-500 mt-2">
                        Member since{" "}
                        {new Date(
                            seller.createdAt
                        ).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default SellerHeader;