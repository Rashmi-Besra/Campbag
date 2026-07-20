import api from "../api/api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

// Login
export const loginUser = async (loginData) => {
  const response = await api.post("/user/login", loginData);
  return response.data;
};

// Verify OTP
export const verifyOTP = async (otpData) => {
  const response = await api.post("/user/verify-otp", otpData);
  return response.data;
};