import React from "react";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

const NoteCard = ({
  id,
  title,
  professor,
  uploadedby,
  branch,
  semester,
  pages,
  views,
  noteType,
  price,
}) => {
  return (
    <Link
      to={`/notes/${id}`}
      className="border rounded-xl p-5 hover:shadow-lg transition duration-300 bg-white"
    >
      {/* PDF Icon */}

      <div className="w-20 h-20 rounded-xl bg-red-100 flex items-center justify-center">
  <FiFileText className="text-red-600 text-4xl" />
</div>

      {/* Title */}

      <h2 className="mt-5 font-semibold text-lg text-center line-clamp-2">
        {title}
      </h2>

      {/* Professor */}

      <p className="mt-3 text-sm text-gray-500">
        <span className="font-medium">Professor:</span>{" "}
        {professor || "Not Mentioned"}
      </p>

      {/* Uploaded By */}

      <p className="text-sm text-gray-500">
        <span className="font-medium">Uploaded By:</span>{" "}
        {uploadedby}
      </p>

      {/* Branch */}

      <p className="text-sm text-gray-500">
        {branch} • Semester {semester}
      </p>

      {/* Pages */}

      <p className="text-sm text-gray-500">
        {pages} Pages
      </p>

      {/* Views */}

      <p className="text-sm text-gray-500">
         {views} Views
      </p>

      {/* Price */}

      <div className="mt-5">

        {
          price === 0 ? (

            <span className="text-pink-400 font-bold">

              FREE

            </span>

          ) : (

            <span className="font-bold text-lg">

              ₹{price}

            </span>

          )
        }

      </div>
    </Link>
  );
};

export default NoteCard;