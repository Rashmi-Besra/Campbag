import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    // User Reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Email
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // OTP
    otp: {
      type: String,
      required: true,
    },

    // Purpose of OTP
    purpose: {
      type: String,
      enum: [
        "VERIFY_EMAIL",
        "RESET_PASSWORD",
        "CHANGE_EMAIL",
      ],
      default: "VERIFY_EMAIL",
    },

    // Expiry Time
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically delete expired OTPs
otpSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
  }
);

const OTP =
  mongoose.models.OTP ||
  mongoose.model("OTP", otpSchema);

export default OTP;