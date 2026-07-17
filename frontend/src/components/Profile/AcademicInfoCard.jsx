import React from "react";
import {
  FiBook,
  FiHome,
  FiHash,
  FiAward,
} from "react-icons/fi";

const AcademicInfoCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl  border border-gray-200 p-6">

      {/* Heading */}

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Academic Information
      </h2>

      <div className="space-y-6">

        {/* Registration Number */}

        <div className="flex items-start gap-4">

          <div className="bg-indigo-100 p-3 rounded-full">
            <FiHash className="text-indigo-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Registration Number
            </p>

            <p className="text-gray-800 font-medium mt-1">
              {profile.registrationNumber}
            </p>
          </div>

        </div>

        {/* Branch */}

        <div className="flex items-start gap-4">

          <div className="bg-indigo-100 p-3 rounded-full">
            <FiAward className="text-indigo-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Branch
            </p>

            <p className="text-gray-800 font-medium mt-1">
              {profile.branch}
            </p>
          </div>

        </div>

        {/* Semester */}

        <div className="flex items-start gap-4">

          <div className="bg-indigo-100 p-3 rounded-full">
            <FiBook className="text-indigo-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Semester
            </p>

            <p className="text-gray-800 font-medium mt-1">
              Semester {profile.semester}
            </p>
          </div>

        </div>

        {/* Hostel */}

        <div className="flex items-start gap-4">

          <div className="bg-indigo-100 p-3 rounded-full">
            <FiHome className="text-indigo-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Hostel
            </p>

            <p className="text-gray-800 font-medium mt-1">
              {profile.hostel || "Not Added"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AcademicInfoCard;