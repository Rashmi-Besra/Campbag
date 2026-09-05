import React, {useEffect} from "react";
import NotificationBell
    from "./NotificationBell";

import socket from "../../services/socket";

const SellerHeader = ({ profile }) => {

    console.log("SELLER HEADER PROFILE:", profile);
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Frontend socket connected:", socket.id);
        });

        return () => {
            socket.off("connect");
        };
    }, []);

    return (

        <header className="bg-white border-b">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <div>

                    <h1 className="text-2xl font-semibold">
                        Seller Dashboard
                    </h1>

                    <p className="text-sm text-gray-500">
                        Manage your store and orders
                    </p>

                </div>


                <div className="flex items-center gap-3">

                    <div className="text-right">

                        <p className="font-medium">
                            {profile?.name || "Seller"}
                        </p>

                        <p className="text-sm text-gray-500">
                            {profile?.sellerVerified
                                ? "Verified Seller"
                                : "Seller"}
                        </p>

                    </div>


                    <img
                        src={
                            profile?.profileImage ||
                            "https://via.placeholder.com/40"
                        }
                        alt="Seller"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <NotificationBell />
                </div>

            </div>

        </header>

    );

};

export default SellerHeader;