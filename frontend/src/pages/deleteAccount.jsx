import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAccount } from "../services/profileService";

const DeleteAccount = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDeleteAccount = async (e) => {

    e.preventDefault();

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setLoading(true);

      const response = await deleteAccount(password);

      if (response.success) {

        toast.success(response.message);

        // Remove login information
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Go to login page
        navigate("/login");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete account."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-6">

        <h1 className="text-2xl font-semibold text-gray-900">
          Delete Account
        </h1>

        <p className="text-gray-500 mt-2">
          Permanently delete your CAMPBAG account.
        </p>

        {/* Warning */}

        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">

          <h2 className="font-semibold text-red-700">
            Warning
          </h2>

          <p className="text-sm text-red-600 mt-2">
            Deleting your account is permanent and cannot be undone.
            Your account information will be removed.
          </p>

        </div>

        {/* Password */}

        <form
          onSubmit={handleDeleteAccount}
          className="mt-6"
        >

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your password to continue
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-6">

            <button
              type="button"
              onClick={() => navigate("/account-settings")}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading
                ? "Deleting..."
                : "Delete My Account"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DeleteAccount;