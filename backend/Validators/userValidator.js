import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters"),

    registrationNumber: z
      .string()
      .trim()
      .min(5, "Registration Number is required"),

    Email: z
      .string()
      .trim()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain one uppercase letter")
      .regex(/[a-z]/, "Password must contain one lowercase letter")
      .regex(/[0-9]/, "Password must contain one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyOtpSchema = z.object({
  Email: z.string().email("Invalid email address"),

  otp: z
    .string()
    .length(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const loginSchema = z.object({
  Email: z.string().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});