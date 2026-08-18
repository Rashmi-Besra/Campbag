import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiChevronRight
} from "react-icons/fi";

const AccountSettings = () => {

  const navigate = useNavigate();

  const handleDeleteProfile = () => {
    navigate("/delete-account");
  };

  return (

    <div className="max-w-4xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-semibold text-gray-900">
        Account Settings
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your account and profile information.
      </p>


      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Edit Profile */}

        <button
          onClick={() => navigate("/edit-profile")}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition"
        >

          <div className="flex items-center gap-4">

            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <FiEdit size={20} />
            </div>

            <div className="text-left">

              <h2 className="font-medium text-gray-900">
                Edit Profile
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Change your personal and academic information.
              </p>

            </div>

          </div>

          <FiChevronRight className="text-gray-400" />

        </button>


        <div className="border-t border-gray-200" />


        {/* Delete Profile */}

        <button
          onClick={handleDeleteProfile}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-red-50 transition"
        >

          <div className="flex items-center gap-4">

            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <FiTrash2 size={20} />
            </div>

            <div className="text-left">

              <h2 className="font-medium text-red-600">
                Delete Profile
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Permanently delete your account and profile.
              </p>

            </div>

          </div>

          <FiChevronRight className="text-gray-400" />

        </button>

      </div>

    </div>

  );
};

export default AccountSettings;