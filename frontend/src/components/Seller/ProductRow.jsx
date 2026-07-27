import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const ProductRow = ({ product, onDelete }) => {

  const navigate = useNavigate();

  const {
    _id,
    name,
    image,
    price,
    quantity,
    views,
    wishlistCount,
    soldCount,
  } = product;

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      {/* Product Image */}
      <td className="px-6 py-4">
        <img
          src={image?.[0]}
          alt={name}
          className="w-16 h-16 object-cover rounded-lg border"
        />
      </td>

      {/* Product Name */}
      <td className="px-6 py-4 font-medium text-gray-800">
        {name}
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        ₹{price}
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        {quantity}
      </td>

      {/* Views */}
      <td className="px-6 py-4">
        {views}
      </td>

      {/* Wishlist */}
      <td className="px-6 py-4">
        {wishlistCount}
      </td>

      {/* Sold */}
      <td className="px-6 py-4">
        {soldCount}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge quantity={quantity} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-3">

          {/* Edit */}
          <button
            onClick={() => navigate(`/seller/edit-product/${_id}`)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaEdit size={18} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(_id)}
            className="text-red-600 hover:text-red-800 transition"
          >
            <FaTrash size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default ProductRow;