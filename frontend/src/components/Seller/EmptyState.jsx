import React from "react";

const EmptyState = ({
    title = "No Products Found",
    message = "You haven't added any products yet.",
}) => {

    return (

        <div className="flex flex-col items-center justify-center py-16 text-center">

           

            <h2 className="text-xl font-semibold text-gray-800">
                {title}
            </h2>

            <p className="text-gray-500 mt-2">
                {message}
            </p>

        </div>

    );

};

export default EmptyState;