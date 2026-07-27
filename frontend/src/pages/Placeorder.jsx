import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";

import Title from "../components/Title";

import DeliveryMethod from "../components/checkouts/DeliveryMethod";
import DeliveryDetails from "../components/checkouts/DeliveryDetails";
import PaymentMethod from "../components/checkouts/PaymentMethod";
import OrderSummary from "../components/checkouts/OrderSummary";
import PlaceOrderButton from "../components/checkouts/PlaceOrderButton";

const PlaceOrder = () => {

    const { placeOrder } = useContext(ShopContext);

    // Payment Method
    const [method, setMethod] = useState("cod");

    // Delivery Method
    const [deliveryMethod, setDeliveryMethod] =
        useState("HOSTEL_DELIVERY");

    // Loading
    const [loading, setLoading] = useState(false);

    // Delivery Form
    const [formData, setFormData] = useState({

        address: "",

        phone: "",

        instructions: "",

    });

    // Handle Input Change

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    // Place Order

    const handlePlaceOrder = async () => {

        if (method !== "cod") {

            toast.info(
                "Online payment will be available soon."
            );

            return;

        }

        if (deliveryMethod === "HOSTEL_DELIVERY") {

            if (formData.address.trim() === "") {

                toast.error("Please enter delivery address.");

                return;

            }

            if (formData.phone.trim() === "") {

                toast.error("Please enter phone number.");

                return;

            }

        }

        const orderData = {

            deliveryMethod,

            address:
                deliveryMethod === "HOSTEL_DELIVERY"
                    ? formData.address
                    : "",

            phone:
                deliveryMethod === "HOSTEL_DELIVERY"
                    ? formData.phone
                    : "",

            instructions:
                deliveryMethod === "HOSTEL_DELIVERY"
                    ? formData.instructions
                    : "",

        };

        try {

            setLoading(true);

            await placeOrder(orderData);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex flex-col lg:flex-row justify-between gap-10 pt-10 border-t min-h-[80vh]">

            {/* Left Side */}

            <div className="flex-1">

                <div className="mb-8">

                    <Title
                        text1={"Checkout"}
                        text2={"Details"}
                    />

                </div>

                <DeliveryMethod
                    deliveryMethod={deliveryMethod}
                    setDeliveryMethod={setDeliveryMethod}
                />

                <DeliveryDetails
                    deliveryMethod={deliveryMethod}
                    formData={formData}
                    handleChange={handleChange}
                />

            </div>

            {/* Right Side */}

            <div className="w-full lg:w-[420px] lg:sticky lg:top-20 h-fit">

                <OrderSummary />

                <PaymentMethod
                    method={method}
                    setMethod={setMethod}
                />

                <PlaceOrderButton
                    loading={loading}
                    handlePlaceOrder={handlePlaceOrder}
                />

            </div>

        </div>

    );

};

export default PlaceOrder;