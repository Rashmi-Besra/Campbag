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
        message:"Validation failed",
        errors: result.error.issues,
      });
    }

    const {
      name,
      registrationNumber,
      Email,
      password,
    } = result.data;

 
    // Existing User
    const existingUser = await User.findOne({ Email });

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
      Email,
      password: hashedPassword,
    });

    // Remove previous OTP (if any)
    await OTP.deleteMany({
      Email: Email,
      purpose: "VERIFY_EMAIL",
    });

    // Generate OTP
    const otp = generateOTP();

    // Save OTP
    await OTP.create({
      user: user._id,
      Email: Email,
      otp,
      purpose: "VERIFY_EMAIL",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send OTP Email
    await sendOTPEmail(Email, otp);

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

    const { Email, password } = result.data;

    // Find user
    const user = await User.findOne({ Email });

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
        Email: user.Email,
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
    console.log("OTP REQUEST BODY:", req.body);

    const result = verifyOtpSchema.safeParse(req.body);

    if (!result.success) {
      console.log("OTP VALIDATION ERROR:", result.error.issues);
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    const { Email, otp } = result.data;

    // Find user
    const user = await User.findOne({ Email });

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
      Email: Email,
      purpose: "VERIFY_EMAIL",
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found.",
      });
    }

    // Check OTP
console.log("OTP FROM DATABASE:", otpRecord.otp);
console.log("OTP FROM REQUEST:", otp);
console.log("DB OTP TYPE:", typeof otpRecord.otp);
console.log("REQUEST OTP TYPE:", typeof otp);

if (String(otpRecord.otp) !== String(otp))  {
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
// ==============================
// Get Current User Profile
// ==============================

const getMyProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};


// ==============================
// Complete User Profile
// ==============================

const completeProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const {
            personalEmail,
            phoneNumber,
            branch,
            semester,
            hostel
        } = req.body;

        user.personalEmail = personalEmail || "";
        user.phoneNumber = phoneNumber || "";
        user.branch = branch || "";
        user.semester = semester || 1;
        user.hostel = hostel || "";

        // Very important
        user.profileCompleted = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile completed successfully.",
            user: {
                id: user._id,
                name: user.name,
                Email: user.Email,
                personalEmail: user.personalEmail,
                registrationNumber: user.registrationNumber,
                phoneNumber: user.phoneNumber,
                branch: user.branch,
                semester: user.semester,
                hostel: user.hostel,
                profileImage: user.profileImage,
                profileCompleted: user.profileCompleted
            }
        });

    } catch (error) {

        console.error("Complete Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const updateMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const {
            personalEmail,
            phoneNumber,
            branch,
            semester,
            hostel,
            profileImage,
        } = req.body;

        if (personalEmail !== undefined)
            user.personalEmail = personalEmail;

        if (phoneNumber !== undefined)
            user.phoneNumber = phoneNumber;

        if (branch !== undefined)
            user.branch = branch;

        if (semester !== undefined)
            user.semester = semester;

        if (hostel !== undefined)
            user.hostel = hostel;

        if (profileImage !== undefined)
            user.profileImage = profileImage;

        user.profileCompleted = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    // Find logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Account Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete account.",
    });
  }
};


export {
  userRegister,
  loginUser,
  verifyOTP,
  getMyProfile,
  completeProfile,
  updateMyProfile,
  deleteAccount,
  
};