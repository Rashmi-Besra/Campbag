import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";

const PersonalInfoCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">

      {/* Heading */}

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Personal Information
      </h2>

      <div className="space-y-6">

        {/* College Email */}

        <div className="flex items-start gap-4">

          <div className="bg-indigo-100 p-3 rounded-full">
            <FiMail className="text-indigo-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              College Email
            </p>

            <p className="text-gray-800 font-medium mt-1">
              {profile.collegeEmail}
            </p>
          </div>

        </div>

        {/* Personal Email */}

        <div className="flex items-start gap-4">

          <div className="bg-green-100 p-3 rounded-full">
            <FiMail className="text-green-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Personal Email
            </p>

            <p className="text-gray-800 font-medium mt-1">
              {profile.personalEmail || "Not Added"}
            </p>
          </div>

        </div>

        {/* Phone */}

        <div className="flex items-start gap-4">

          <div className="bg-yellow-100 p-3 rounded-full">
            <FiPhone className="text-yellow-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone Number
            </p>

            <p className="text-gray-800 font-medium mt-1">
              {profile.phone}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default PersonalInfoCard;