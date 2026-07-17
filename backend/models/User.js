import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================
    // Basic Information
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    collegeEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    personalEmail: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      default: "",
      trim: true,
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    // =========================
    // Authentication
    // =========================
    password: {
      type: String,
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    

    // =========================
    // Profile
    // =========================
    profileImage: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    semester: {
      type: Number,
      default: 1,
    },

    hostel: {
      type: String,
      default: "",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    // =========================
    // Seller Information
    // =========================
    sellerVerified: {
      type: Boolean,
      default: false,
    },

    trustScore: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    },

    // =========================
    // User Role
    // =========================
    role: {
      type: String,
      enum: ["student", "society", "admin"],
      default: "student",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;