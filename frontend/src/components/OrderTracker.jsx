import React, { useEffect, useState } from "react";

import {
    ClipboardList,
    Check,
    Package,
    Truck,
    CircleCheck,
    ArrowRight,
} from "lucide-react";


const OrderTracker = ({ status }) => {

    const steps = [
        {
            name: "Placed",
            icon: ClipboardList,
        },
        {
            name: "Accepted",
            icon: Check,
        },
        {
            name: "Packed",
            icon: Package,
        },
        {
            name: "Out for Delivery",
            icon: Truck,
        },
        {
            name: "Delivered",
            icon: CircleCheck,
        },
    ];


    const targetIndex = steps.findIndex(
        (step) => step.name === status
    );


    /*
        This is the position of the SINGLE arrow.

        Start from Placed and then animate
        towards the actual order status.
    */

    const [arrowIndex, setArrowIndex] = useState(0);


    useEffect(() => {

        if (targetIndex === -1) {
            return;
        }

        /*
            Small delay makes the arrow visibly
            travel from its previous position.
        */

        const timer = setTimeout(() => {

            setArrowIndex(targetIndex);

        }, 100);


        return () => clearTimeout(timer);

    }, [targetIndex]);


    /*
        Convert current step into percentage.

        0   = Placed
        25  = Accepted
        50  = Packed
        75  = Out for Delivery
        100 = Delivered
    */

    const arrowPosition =
        (arrowIndex / (steps.length - 1)) * 100;


    return (

        <div className="w-full py-8">

            <div className="relative">

                {/* =========================
                    BACKGROUND PATH
                ========================== */}

                <div
                    className="
                        absolute
                        top-6
                        left-[10%]
                        right-[10%]
                        h-1
                        bg-gray-200
                        rounded-full
                    "
                />


                {/* =========================
                    COMPLETED PATH
                ========================== */}

                <div
                    className="
                        absolute
                        top-6
                        left-[10%]
                        h-1
                        bg-pink-500
                        rounded-full
                        transition-all
                        duration-[1500ms]
                        ease-in-out
                    "
                    style={{
                        width: `calc(${arrowPosition * 0.8}% )`,
                    }}
                />


                {/* =========================
                    SINGLE MOVING ARROW
                ========================== */}

                <div
                    className="
                        absolute
                        top-6
                        z-20
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-full
                        bg-pink-500
                        text-white
                        shadow-md
                        transition-all
                        duration-[1500ms]
                        ease-in-out
                    "
                    style={{
                        left: `calc(${10 + arrowPosition * 0.8}% - 20px)`,
                        transform: "translateY(-50%)",
                    }}
                >

                    <ArrowRight
                        size={22}
                        strokeWidth={2.5}
                    />

                </div>


                {/* =========================
                    STATUS STEPS
                ========================== */}

                <div className="relative flex justify-between">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        const completed =
                            index <= targetIndex;

                        const current =
                            index === targetIndex;


                        return (

                            <div
                                key={step.name}
                                className="
                                    flex
                                    flex-col
                                    items-center
                                    w-1/5
                                "
                            >

                                {/* ICON */}

                                <div
                                    className={`
                                        w-12
                                        h-12
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        border-2
                                        bg-white
                                        transition-all
                                        duration-800
                                        ${
                                            completed
                                                ? "border-pink-500 text-pink-600"
                                                : "border-pink-300 text-pink-400"
                                        }
                                        ${
                                            current
                                                ? "scale-110 shadow-md"
                                                : ""
                                        }
                                    `}
                                >

                                    <Icon
                                        size={22}
                                        strokeWidth={2.2}
                                    />

                                </div>


                                {/* STATUS NAME */}

                                <p
                                    className={`
                                        mt-3
                                        text-xs
                                        sm:text-sm
                                        text-center
                                        whitespace-nowrap
                                        ${
                                            completed
                                                ? "text-gray-800 font-medium"
                                                : "text-gray-400"
                                        }
                                    `}
                                >
                                    {step.name}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>

    );
};


export default OrderTracker;