import OrderRow from "./OrderRow";

const OrderTable = ({ orders, onStatusChange }) => {

    return (

        <div className="overflow-x-auto bg-white rounded-xl shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-6 py-4 text-left">
                            Order ID
                        </th>

                        <th className="px-6 py-4 text-left">
                            Buyer
                        </th>

                        <th className="px-6 py-4 text-left">
                            Products
                        </th>

                        <th className="px-6 py-4 text-left">
                            Amount
                        </th>

                        <th className="px-6 py-4 text-left">
                            Date
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <OrderRow
                            key={order._id}
                            order={order}
                            onStatusChange={onStatusChange}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default OrderTable;