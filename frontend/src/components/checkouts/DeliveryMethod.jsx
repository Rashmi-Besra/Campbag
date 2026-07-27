import React from "react";

const DeliveryMethod = ({
    deliveryMethod,
    setDeliveryMethod,
}) => {

    return (

        <div className="border rounded-lg p-5 shadow-sm">

            <h3 className="text-lg font-semibold mb-5">
                Delivery Method
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">

                {/* Hostel Delivery */}

                <div
                    onClick={() =>
                        setDeliveryMethod("HOSTEL_DELIVERY")
                    }
                    className={`flex-1 border rounded-lg p-4 cursor-pointer transition

                    ${
                        deliveryMethod === "HOSTEL_DELIVERY"

                            ? "border-black bg-gray-100"

                            : "border-gray-300"
                    }

                    `}
                >

                    <div className="flex items-center gap-3">

                        <input
                            type="radio"
                            checked={
                                deliveryMethod ===
                                "HOSTEL_DELIVERY"
                            }
                            readOnly
                        />

                        <div>

                            <p className="font-semibold">
                                Hostel Delivery
                            </p>

                            <p className="text-sm text-gray-500">
                                Deliver directly to your
                                hostel or PG.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Self Pickup */}

                <div
                    onClick={() =>
                        setDeliveryMethod("SELF_PICKUP")
                    }
                    className={`flex-1 border rounded-lg p-4 cursor-pointer transition

                    ${
                        deliveryMethod === "SELF_PICKUP"

                            ? "border-black bg-gray-100"

                            : "border-gray-300"
                    }

                    `}
                >

                    <div className="flex items-center gap-3">

                        <input
                            type="radio"
                            checked={
                                deliveryMethod ===
                                "SELF_PICKUP"
                            }
                            readOnly
                        />

                        <div>

                            <p className="font-semibold">
                                Self Pickup
                            </p>

                            <p className="text-sm text-gray-500">
                                Meet the seller and collect
                                the item yourself.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DeliveryMethod;