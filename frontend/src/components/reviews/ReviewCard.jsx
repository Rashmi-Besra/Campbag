import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";

const ReviewCard = ({
  review,
  currentUserId,
  onEdit,
  onDelete,
}) => {

  const isOwner = String(review.user?._id) === String(currentUserId);
  console.log("Review User:", review.user);
console.log("Review User _id:", review.user?._id);
console.log("Current User ID:", currentUserId);
console.log(
  "Is Owner:",
  String(review.user?._id) === String(currentUserId)
);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">

      <div className="flex justify-between items-start">

        {/* Left Side */}
        <div className="flex gap-4">

          <FaUserCircle
            size={50}
            className="text-gray-400"
          />

          <div>

            <h3 className="font-semibold text-lg">
              {review.user?.name}
            </h3>

            <div className="flex items-center gap-3 mt-1">

              <StarRating rating={review.rating} />

              <span className="text-sm text-gray-500">
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

          </div>

        </div>

        {/* Right Side */}
        {isOwner && (

          <div className="flex gap-3">

            <button
              onClick={() => onEdit(review)}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaEdit size={18} />
            </button>

            <button
              onClick={() => onDelete(review._id)}
              className="text-red-600 hover:text-red-800 transition"
            >
              <FaTrash size={18} />
            </button>

          </div>

        )}

      </div>

      {/* Comment */}
      <p className="mt-4 text-gray-700 leading-relaxed">
        {review.comment}
      </p>

    </div>
  );

};

export default ReviewCard;