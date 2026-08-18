import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { verifyOTP } from "../services/authService";

const VerifyOTP = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const Email = location.state?.Email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {

      setLoading(true);
      console.log("OTP DATA BEING SENT:", {
    Email,
    otp,
});
      const response = await verifyOTP({
        Email,
        otp,
      });

      if (response.success) {

        toast.success(response.message);

        navigate("/login");

      }

    } catch (error) {
      console.log("VERIFY OTP ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
      toast.error(
        error.response?.data?.message || "OTP Verification Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-5"
      >

        <h2 className="text-3xl font-semibold text-center">
          Verify Email
        </h2>

        <p className="text-center text-gray-500">
          OTP sent to
        </p>

        <p className="text-center font-medium">
          {Email}
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
          className="w-full border px-3 py-2 rounded text-center tracking-widest"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </form>

    </div>

  );

};

export default VerifyOTP;