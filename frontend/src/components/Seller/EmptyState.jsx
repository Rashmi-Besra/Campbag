import { FaBoxOpen } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <FaBoxOpen
        size={70}
        className="text-gray-400 mb-6"
      />

      <h2 className="text-2xl font-semibold text-gray-700">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-2 mb-6 text-center">
        You haven't added any products yet.
      </p>

      <button
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Add Your First Product
      </button>

    </div>
  );
};

export default EmptyState;