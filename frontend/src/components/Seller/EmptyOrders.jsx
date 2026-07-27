import { FaBoxOpen } from "react-icons/fa";

const EmptyOrders = () => {

    return (

        <div className="bg-white rounded-xl shadow p-12 text-center">

            <FaBoxOpen
                size={60}
                className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl font-semibold mt-4">

                No Orders Yet

            </h2>

            <p className="text-gray-500 mt-2">

                Orders from customers will appear here.

            </p>

        </div>

    );

};

export default EmptyOrders;