import React from "react";

const DashboardCard = ({ title, children }) => {

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                </h2>
            </div>

            {/* Card Content */}
            <div className="p-6">
                {children}
            </div>

        </div>
    );
};

export default DashboardCard;