import { z } from "zod";


// ======================================
// PLACE ORDER
// ======================================

export const placeOrderSchema = z
    .object({

        paymentMethod: z.enum([
            "COD",
            "ONLINE",
        ]),

        deliveryMethod: z.enum([
            "HOSTEL_DELIVERY",
            "SELF_PICKUP",
        ]),

        deliveryDetails: z.object({

            address: z.string().optional(),

            phone: z.string().optional(),

            instructions: z.string().optional(),

        }),

    })
    .superRefine((data, ctx) => {

        if (
            data.deliveryMethod ===
            "HOSTEL_DELIVERY"
        ) {

            if (
                !data.deliveryDetails.address ||
                data.deliveryDetails.address.trim() === ""
            ) {

                ctx.addIssue({

                    code: z.ZodIssueCode.custom,

                    path: [
                        "deliveryDetails",
                        "address",
                    ],

                    message:
                        "Address is required.",

                });

            }

            if (
                !data.deliveryDetails.phone ||
                data.deliveryDetails.phone.trim() === ""
            ) {

                ctx.addIssue({

                    code: z.ZodIssueCode.custom,

                    path: [
                        "deliveryDetails",
                        "phone",
                    ],

                    message:
                        "Phone number is required.",

                });

            }

        }

    });


// ======================================
// UPDATE ORDER STATUS
// ======================================

export const updateOrderStatusSchema = z.object({

    status: z.enum([
        "Accepted",
        "Packed",
        "Out for Delivery",
        "Delivered",
    ]),

});