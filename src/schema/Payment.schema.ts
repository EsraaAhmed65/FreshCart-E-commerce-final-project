import * as z from 'zod';

export const paymentSchema = z.object({
    details: z.string()
        .min(10, "Address details must be at least 10 characters")
        .max(200, "Address details must be less than 200 characters"),
    phone: z.string()
        .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number format")
        .min(11, "Phone number must be 11 digits")
        .max(11, "Phone number must be 11 digits"),
    city: z.string()
        .min(2, "City name must be at least 2 characters")
        .max(50, "City name must be less than 50 characters")
});

export type PaymentSchemaType = z.infer<typeof paymentSchema>;