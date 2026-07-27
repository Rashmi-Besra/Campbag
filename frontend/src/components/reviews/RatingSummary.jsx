import StarRating from "./StarRating";

const RatingSummary = ({
  averageRating = 0,
  reviewCount = 0,
}) => {

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews
      </h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Left Section */}
        <div>

          <div className="flex items-center gap-3">

            <span className="text-5xl font-bold">
              {averageRating.toFixed(1)}
            </span>

            <StarRating rating={averageRating} />

          </div>

          <p className="text-gray-500 mt-2">
            Based on {reviewCount} review{reviewCount !== 1 && "s"}
          </p>

        </div>

        {/* Right Section */}
        <div className="w-full md:w-72">

          {[5, 4, 3, 2, 1].map((star) => (

            <div
              key={star}
              className="flex items-center gap-3 mb-2"
            >

              <span className="w-6">
                {star}
              </span>

              <div className="flex-1 bg-gray-200 rounded-full h-2">

                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: "0%" }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );

};

export default RatingSummary;