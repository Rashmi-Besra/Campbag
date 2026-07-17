import React from "react";

const NotesFilterSidebar = ({
  filterVisible,
  setFilterVisible,
  selectedType,
  toggleType,
  sortType,
  setSortType,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 z-50
      ${
        filterVisible
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      {/* Header */}

      <div className="flex justify-between items-center p-5 border-b">

        <h2 className="font-semibold text-lg">

          Filters

        </h2>

        <button
          onClick={() => setFilterVisible(false)}
          className="text-xl"
        >
          ✕
        </button>

      </div>

      <div className="p-5 space-y-8">

        {/* Note Type */}

        <div>

          <h3 className="font-medium mb-3">

            Note Type

          </h3>

          <div className="space-y-3">

            <label className="flex gap-3">

              <input
                type="checkbox"
                checked={selectedType.includes("Free")}
                onChange={() => toggleType("Free")}
              />

              Free

            </label>

            <label className="flex gap-3">

              <input
                type="checkbox"
                checked={selectedType.includes("Paid")}
                onChange={() => toggleType("Paid")}
              />

              Paid

            </label>

          </div>

        </div>

        {/* Sorting */}

        <div>

          <h3 className="font-medium mb-3">

            Sort By

          </h3>

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value)
            }
            className="border rounded-lg w-full p-2"
          >
            <option>Newest</option>

            <option>Oldest</option>

            <option>Low-High</option>

            <option>High-Low</option>

            <option>Most Viewed</option>

          </select>

        </div>

      </div>
    </div>
  );
};

export default NotesFilterSidebar;