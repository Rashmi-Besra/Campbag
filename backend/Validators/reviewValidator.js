import { z } from "zod";

export const createReviewSchema = z.object({

    productId: z
        .string()
        .min(1, "Product ID is required."),

    orderId: z
        .string()
        .min(1, "Order ID is required."),

    rating: z
        .number()
        .int()
        .min(1)
        .max(5),

    comment: z
        .string()
        .trim()
        .max(1000)
        .optional(),

});

export const updateReviewSchema = z.object({

    rating: z
        .number()
        .min(1)
        .max(5),

    comment: z
        .string()
        .min(1)
        .max(1000),

});