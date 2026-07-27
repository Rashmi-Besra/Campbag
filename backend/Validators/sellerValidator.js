import { z } from "zod";

export const updateOrderItemStatusSchema = z.object({
  status: z.enum(["Placed", "Packed", "Shipped", "Delivered", "Cancelled"]),
});