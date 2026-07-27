import React from "react";

const DeliveryDetails = ({
    deliveryMethod,
    formData,
    handleChange,
}) => {

    return (

        <div className="border rounded-lg p-5 shadow-sm mt-6">

            <h3 className="text-lg font-semibold mb-5">
                Delivery Details
            </h3>

            {deliveryMethod === "HOSTEL_DELIVERY" ? (

                <>

                    {/* Address */}

                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Delivery Address
                        </label>

                        <textarea
                            rows={4}
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Example: Brahmaputra Hostel, Room B-213"
                            className="w-full border rounded-lg p-3 outline-none focus:border-black resize-none"
                        />

                    </div>

                    {/* Phone */}

                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full border rounded-lg p-3 outline-none focus:border-black"
                        />

                    </div>

                    {/* Instructions */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Delivery Instructions
                        </label>

                        <textarea
                            rows={3}
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            placeholder="Call before coming, leave at hostel gate, etc."
                            className="w-full border rounded-lg p-3 outline-none focus:border-black resize-none"
                        />

                    </div>

                </>

            ) : (

                <div className="bg-green-50 border border-green-200 rounded-lg p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">

                            📍

                        </div>

                        <div>

                            <h4 className="font-semibold text-green-700">
                                Self Pickup Selected
                            </h4>

                            <p className="text-sm text-gray-600 mt-1">
                                The seller will contact you after accepting
                                your order to decide the pickup location.
                            </p>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default DeliveryDetails;