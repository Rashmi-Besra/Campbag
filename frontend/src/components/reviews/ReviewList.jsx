import ReviewCard from "./ReviewCard";

const ReviewList = ({
  reviews = [],
  currentUserId,
  onEdit,
  onDelete,
}) => {

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">

        <h2 className="text-xl font-semibold">
          No Reviews Yet
        </h2>

        <p className="text-gray-500 mt-2">
          Be the first person to review this product.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {reviews.map((review) => (

        <ReviewCard
          key={review._id}
          review={review}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>
  );

};

export default ReviewList;