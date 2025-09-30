import { z } from "zod";

export const verifyCodeSchema = z.object({
  resetCode: z.string().min(4, "Reset code must be at least 4 characters").max(10, "Reset code must be at most 10 characters"),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;
