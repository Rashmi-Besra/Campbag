import React from "react";
import CartTotal from "../CartTotal";
import Title from "../Title";

const OrderSummary = () => {

    return (

        <div className="border rounded-lg shadow-sm p-5">

            <Title
                text1={"Order"}
                text2={"Summary"}
            />

            <div className="mt-5">

                <CartTotal />

            </div>

        </div>

    );

};

export default OrderSummary;