import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../services/authService";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    Email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await registerUser({
        name: formData.name,
        registrationNumber: formData.registrationNumber,
        Email: formData.Email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.success) {

        toast.success(response.message);

        navigate("/verify-otp", {
          state: {
            Email: formData.Email,
          },
        });

      }

    } catch (error) {

     console.log(error.response?.data.errors);

toast.error(
  error.response?.data?.message ||
  JSON.stringify(error.response?.data) ||
  error.message
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
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm">

          Already have an account?

          <span
            className="text-blue-600 cursor-pointer ml-2"
            onClick={() => navigate("/login")}
          >
            Login
          </span>

        </p>

      </form>

    </div>

  );

};

export default Signup;