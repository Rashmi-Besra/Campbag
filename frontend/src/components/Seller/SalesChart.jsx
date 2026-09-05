import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


const SalesChart = ({ orders = [] }) => {

    const groupedSales = {};

    orders
        .filter(
            (order) =>
                order.orderStatus === "Delivered"
        )
        .forEach((order) => {

            const date = new Date(
                order.createdAt
            ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            });

            const itemsSold = order.items.reduce(
                (total, item) =>
                    total + (item.quantity || 0),
                0
            );

            if (!groupedSales[date]) {
                groupedSales[date] = 0;
            }

            groupedSales[date] += itemsSold;

        });


    const salesData = Object.entries(groupedSales)
        .map(([date, sales]) => ({
            date,
            sales,
        }));


    if (salesData.length === 0) {

        return (
            <div className="h-64 flex items-center justify-center">

                <div className="text-center">

                    <p className="text-gray-500">
                        No sales data yet
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        Delivered sales will appear here.
                    </p>

                </div>

            </div>
        );

    }


    return (

        <div className="w-full h-64">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <LineChart
                    data={salesData}
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

                    <YAxis
                        allowDecimals={false}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `${value} items`,
                            "Items Sold",
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="sales"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                        }}
                        activeDot={{
                            r: 7,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};


export default SalesChart;