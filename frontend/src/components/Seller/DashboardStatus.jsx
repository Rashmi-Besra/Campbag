import React from "react";

const DashboardStatus = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-4">
                Store Status
            </h3>

            <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                <span className="text-gray-700">
                    Your store is active
                </span>
            </div>
        </div>
    );
};

export default DashboardStatus;