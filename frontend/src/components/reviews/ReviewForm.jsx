import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({
  onSubmit,
  editingReview,
  loading = false,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating);
      setComment(editingReview.comment);
    } else {
      setRating(5);
      setComment("");
    }
  }, [editingReview]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    onSubmit({
      rating,
      comment,
    });

    if (!editingReview) {
      setRating(5);
      setComment("");
    }
  };

  return (
    <div className="mt-8 rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        {editingReview ? "Edit Review" : "Write a Review"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="mb-2 block font-medium">Rating</label>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition-colors ${
                  star <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="mb-2 block font-medium">Review</label>

          <textarea
            rows={5}
            className="w-full rounded-md border border-gray-300 p-3 focus:border-black focus:outline-none"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : editingReview
            ? "Update Review"
            : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;