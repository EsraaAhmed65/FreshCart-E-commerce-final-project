import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email").min(5, "Min length is 5").max(50, "Max length is 50"),
});

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;
