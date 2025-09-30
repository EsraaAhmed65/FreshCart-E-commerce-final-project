import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email").min(5, "Min length is 5").max(50, "Max length is 50"),
  newPassword: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
