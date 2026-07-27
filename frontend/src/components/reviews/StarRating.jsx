import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating = 0, size = 18 }) => {
  const renderStar = (index) => {
    if (rating >= index) {
      return <FaStar key={index} size={size} className="text-yellow-400" />;
    }

    if (rating >= index - 0.5) {
      return (
        <FaStarHalfAlt
          key={index}
          size={size}
          className="text-yellow-400"
        />
      );
    }

    return (
      <FaRegStar
        key={index}
        size={size}
        className="text-yellow-400"
      />
    );
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(renderStar)}
    </div>
  );
};

export default StarRating;