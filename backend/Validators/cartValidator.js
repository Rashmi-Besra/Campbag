import { z } from "zod";

// Add Item to Cart
export const addCartSchema = z.object({
  productId: z
    .string()
    .trim()
    .min(1, "Product ID is required"),

  option: z
    .string()
    .trim()
    .default("default"),

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
});

// Update Cart Item
export const updateCartSchema = z.object({
  productId: z
    .string()
    .trim()
    .min(1, "Product ID is required"),

  option: z
    .string()
    .trim()
    .default("default"),

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),
});