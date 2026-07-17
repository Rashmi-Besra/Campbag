import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

const AccountStatusCard = ({ profile }) => {

  return (

    <div className="bg-white rounded-2xl  border border-gray-200 p-6">

      <h2 className="text-xl font-semibold text-gray-800 mb-6">

        Account Status

      </h2>

      <div className="space-y-6">

        {/* Student Verification */}

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FiCheckCircle className="text-green-600 text-xl" />

            <span className="text-gray-700">

              Student Verification

            </span>

          </div>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">

            Verified

          </span>

        </div>

        {/* Seller Status */}

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FiClock className="text-yellow-600 text-xl" />

            <span className="text-gray-700">

              Seller Status

            </span>

          </div>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">

            {profile.sellerStatus}

          </span>

        </div>

        {/* Trust Score */}

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FiShield className="text-indigo-600 text-xl" />

            <span className="text-gray-700">

              Trust Score

            </span>

          </div>

          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">

            {profile.trustScore}/100

          </span>

        </div>

      </div>

    </div>

  );

};

export default AccountStatusCard;