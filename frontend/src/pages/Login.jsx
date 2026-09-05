import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connectSocket } from "../services/socket";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);
       console.log("LOGIN RESPONSE:", response);
    console.log("TOKEN RECEIVED:", response.token);
if (response.success) {

   

    localStorage.setItem("token", response.token);
    localStorage.setItem(
        "user",
        JSON.stringify(response.user)
    );

    toast.success(response.message);
    connectSocket();

    navigate("/");
}
    } catch (error) {

    console.log("LOGIN ERROR:", error);
    console.log("LOGIN STATUS:", error.response?.status);
    console.log("LOGIN DATA:", error.response?.data);

    toast.error(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
    );
}
    finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="email"
        name="Email"
        placeholder="Email"
        value={formData.Email}
        onChange={handleChange}
        required
      />

      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="w-full flex justify-end text-sm">
        <p className="cursor-pointer">
          Forgot your password?
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white cursor-pointer font-light px-8 py-2 mt-4 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-sm">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-600 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;