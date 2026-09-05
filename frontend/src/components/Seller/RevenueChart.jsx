import React, { useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ orders = [] }) => {

    const [range, setRange] = useState(7);

    const revenueData = useMemo(() => {

        const today = new Date();

        const data = [];

        for (let i = range - 1; i >= 0; i--) {

            const date = new Date(today);

            date.setDate(
                today.getDate() - i
            );

            const dateKey =
                date.toISOString().split("T")[0];

            const revenue = orders
                .filter((order) => {

                    if (
                        order.orderStatus !==
                        "Delivered"
                    ) {
                        return false;
                    }

                    const orderDate =
                        new Date(order.createdAt)
                            .toISOString()
                            .split("T")[0];

                    return orderDate === dateKey;

                })
                .reduce(
                    (total, order) =>
                        total +
                        Number(
                            order.totalAmount || 0
                        ),
                    0
                );

            data.push({

                date: date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                    }
                ),

                revenue,

            });

        }

        return data;

    }, [orders, range]);


    const totalRevenue = revenueData.reduce(
        (total, item) =>
            total + item.revenue,
        0
    );


    return (

        <div className="w-full">

            {/* Header */}

            <div className="flex justify-between items-start mb-4">

                <div>

                    <p className="text-sm text-gray-500">
                        Completed Revenue
                    </p>

                    <h3 className="text-2xl font-semibold mt-1">
                        ₹{totalRevenue}
                    </h3>

                </div>


                {/* Range Buttons */}

                <div className="flex gap-2">

                    <button
                        onClick={() =>
                            setRange(7)
                        }
                        className={`px-3 py-1 rounded-md text-sm ${
                            range === 7
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        7 Days
                    </button>


                    <button
                        onClick={() =>
                            setRange(30)
                        }
                        className={`px-3 py-1 rounded-md text-sm ${
                            range === 30
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        30 Days
                    </button>

                </div>

            </div>


            {/* Chart */}

            <div className="h-64">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={revenueData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="date"
                        />

                        <YAxis />

                        <Tooltip
                            formatter={(value) =>
                                [`₹${value}`, "Revenue"]
                            }
                        />


                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#000"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default RevenueChart;