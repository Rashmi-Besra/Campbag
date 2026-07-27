import OrderStatusBadge from "./OrderStatusBadge";

const OrderRow = ({ order, onStatusChange }) => {

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="px-6 py-4">
                {order._id.slice(-6)}
            </td>

            <td className="px-6 py-4">

                <div className="font-medium">
                    {order.buyer?.name}
                </div>

                <div className="text-sm text-gray-500">
                    {order.buyer?.email}
                </div>

            </td>

            <td className="px-6 py-4">

                {order.items.map((item) => (

                    <div key={item._id}>

                        {item.product?.name}

                        {" × "}

                        {item.quantity}

                    </div>

                ))}

            </td>

            <td className="px-6 py-4">

                ₹{order.totalAmount}

            </td>

            <td className="px-6 py-4">

                {new Date(order.createdAt).toLocaleDateString()}

            </td>

            <td className="px-6 py-4">

                <OrderStatusBadge
                    status={order.status}
                />

            </td>

            <td className="px-6 py-4">

                <select

                    value={order.status}

                    onChange={(e) =>
                        onStatusChange(
                            order._id,
                            e.target.value
                        )
                    }

                    className="border rounded-lg px-3 py-2"
                >

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Confirmed">
                        Confirmed
                    </option>

                    <option value="Shipped">
                        Shipped
                    </option>

                    <option value="Delivered">
                        Delivered
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                </select>

            </td>

        </tr>

    );

};

export default OrderRow;