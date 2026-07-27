import React from "react";

const PlaceOrderButton = ({
    loading,
    handlePlaceOrder,
}) => {

    return (

        <button

            onClick={handlePlaceOrder}

            disabled={loading}

            className={`

                w-full
                mt-8
                py-3
                rounded-lg
                text-white
                font-medium
                transition-all
                duration-300

                ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-900 hover:scale-[1.02]"
                }

            `}

        >

            {

                loading

                    ? (

                        <div className="flex justify-center items-center gap-2">

                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                            <span>
                                Placing Order...
                            </span>

                        </div>

                    )

                    : (

                        "Place Order"

                    )

            }

        </button>

    );

};

export default PlaceOrderButton;