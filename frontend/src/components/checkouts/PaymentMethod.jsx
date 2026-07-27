import React from "react";
import { assets } from "../../assets/assets";
import Title from "../Title";

const PaymentMethod = ({
    method,
    setMethod,
}) => {

    return (

        <div className="border rounded-lg shadow-sm p-5 mt-6">

            <Title
                text1={"Payment"}
                text2={"Method"}
            />

            <div className="flex flex-col gap-4 mt-5">

                {/* Stripe */}

                <div
                    className="flex justify-between items-center border rounded-lg p-4 opacity-50 cursor-not-allowed"
                >

                    <div className="flex items-center gap-4">

                        <img
                            src={assets.stripe_logo}
                            alt="Stripe"
                            className="h-5"
                        />

                        <span>Stripe</span>

                    </div>

                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        Coming Soon
                    </span>

                </div>

                {/* Razorpay */}

                <div
                    className="flex justify-between items-center border rounded-lg p-4 opacity-50 cursor-not-allowed"
                >

                    <div className="flex items-center gap-4">

                        <img
                            src={assets.razorpay_logo}
                            alt="Razorpay"
                            className="h-5"
                        />

                        <span>Razorpay</span>

                    </div>

                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        Coming Soon
                    </span>

                </div>

                {/* Cash On Delivery */}

                <div

                    onClick={() => setMethod("cod")}

                    className={`border rounded-lg p-4 cursor-pointer transition

                    ${

                        method === "cod"

                            ? "border-black bg-gray-100"

                            : "border-gray-300"

                    }

                    `}

                >

                    <div className="flex items-center gap-3">

                        <input
                            type="radio"
                            checked={method === "cod"}
                            readOnly
                        />

                        <span className="font-medium">
                            Cash On Delivery
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default PaymentMethod;