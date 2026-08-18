import OrderStatusBadge from "./OrderStatusBadge";

const OrderRow = ({ order, handleStatusChange }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{order._id.slice(-6)}</td>

      <td className="px-6 py-4">
        <div className="font-medium">{order.user?.name}</div>

        <div className="text-sm text-gray-500">{order.user?.collegeEmail}</div>
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

      <td className="px-6 py-4">₹{order.totalAmount}</td>

      <td className="px-6 py-4">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      <td className="px-6 py-4">
        <select
          value={order.orderStatus}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="Placed">Placed</option>

          <option value="Accepted">Accepted</option>

          <option value="Packed">Packed</option>

          <option value="Out for Delivery">Out for Delivery</option>

          <option value="Delivered">Delivered</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderRow;
