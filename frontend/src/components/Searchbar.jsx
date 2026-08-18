import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Searchbar = () => {
  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  } = useContext(ShopContext);

  if (!showSearch) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-3">
      
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books, electronics..."
          className="w-full border border-gray-300 rounded-full px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        )}
      </div>

    </div>
  );
};

export default Searchbar;