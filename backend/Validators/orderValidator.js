import { z } from "zod";




export const placeOrderSchema = z
  .object({
    deliveryMethod: z.enum([
      "HOSTEL_DELIVERY",
      "SELF_PICKUP",
    ]),

    address: z.string().optional(),

    phone: z.string().optional(),

    instructions: z.string().optional(),
  })
  .superRefine((data, ctx) => {

    if (data.deliveryMethod === "HOSTEL_DELIVERY") {

      if (!data.address || data.address.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address"],
          message: "Address is required.",
        });
      }

      if (!data.phone || data.phone.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Phone number is required.",
        });
      }

    }

  });