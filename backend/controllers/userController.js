import User from "../models/User.js";
import OTP from "../models/OTP.js";
import bcrypt from "bcrypt";
import { z } from "zod";

import generateOTP from "../utils/generateOTP.js";
import sendOTPEmail from "../utils/sendOTPEmail.js";
import generateToken from "../utils/generateToken.js";
import {
  registerSchema,
  verifyOtpSchema,
  loginSchema,
} from "../validators/userValidator.js";


// ==============================
// User Registration
// ==============================

const userRegister = async (req, res) => {
  try {
    // Validate input
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    const {
      name,
      registrationNumber,
      collegeEmail,
      password,
    } = result.data;

    // Only NIT Jamshedpur Emails
    if (!collegeEmail.endsWith("@nitjsr.ac.in")) {
      return res.status(400).json({
        success: false,
        message: "Only NIT Jamshedpur college emails are allowed.",
      });
    }

    // Existing User
    const existingUser = await User.findOne({ collegeEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Registration Number
    const existingRegistration = await User.findOne({
      registrationNumber,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "Registration Number already exists.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      registrationNumber,
      collegeEmail,
      password: hashedPassword,
    });

    // Remove previous OTP (if any)
    await OTP.deleteMany({
      email: collegeEmail,
      purpose: "VERIFY_EMAIL",
    });

    // Generate OTP
    const otp = generateOTP();

    // Save OTP
    await OTP.create({
      user: user._id,
      email: collegeEmail,
      otp,
      purpose: "VERIFY_EMAIL",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send OTP Email
    await sendOTPEmail(collegeEmail, otp);

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email using the OTP sent to your college email.",
    });

  } catch (error) {

     console.error("Register Error:", error);

    return res.status(500).json({
        success:false,
        message:error.message
    });

  }
};





// ==============================
// Login User
// ==============================

const loginUser = async (req, res) => {
  try {
    // Validate request body
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    const { collegeEmail, password } = result.data;

    // Find user
    const user = await User.findOne({ collegeEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check email verification
    if (!user.emailVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Update last seen
    user.lastSeen = new Date();
    await user.save();

    // Success
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        collegeEmail: user.collegeEmail,
        role: user.role,
        profileCompleted: user.profileCompleted,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Verify OTP
// ==============================

const verifyOTP = async (req, res) => {
  try {
    // Validate request
    const result = verifyOtpSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    const { collegeEmail, otp } = result.data;

    // Find user
    const user = await User.findOne({ collegeEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Already verified
    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Find OTP
    const otpRecord = await OTP.findOne({
      email: collegeEmail,
      purpose: "VERIFY_EMAIL",
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found.",
      });
    }

    // Check OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Verify Email
    user.emailVerified = true;

    await user.save();

    // Delete OTP
    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ==============================
// Admin Login
// ==============================



export {
  userRegister,
  loginUser,
  verifyOTP,
  
};