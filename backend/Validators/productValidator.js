import { z } from "zod";

export const addProductSchema = z.object({

    name: z.string().min(3),

    description: z.string().min(10),

    price: z.coerce.number().positive(),

    category: z.string(),

    subCategory: z.string(),

    quantity: z.coerce.number().min(1),

    condition: z.enum([
        "New",
        "Like New",
        "Good",
        "Fair"
    ]),
    branch: z.string().optional(),
    semester: z.coerce.number().optional(),
   

});