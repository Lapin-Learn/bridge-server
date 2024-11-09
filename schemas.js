import { z } from "zod";

export const resetPassworControllSchema = z.object({
  subject: z.string().default("[LapinLearn] Reset password"),
});

export const resetPasswordPayloadSchema = z.object({
  otp: z.string().length(6),
});
