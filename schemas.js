import { z } from "zod";
import { templateNameEnum } from "./enum.js";

export const sendMailControllSchema = z.object({
  subject: z.string().default("{{subject}}"),
});

export const resetPasswordPayloadSchema = z.object({
  otp: z.string().length(6).default("123456"),
});

export const profileStreakActivitySchema = z.object({
  email: z.string().email().default("bddquan@gmail.com"),
  username: z.string().default("bddquan"),
  currentStreak: z.number().int().default(10),
  activities: z
    .array(
      z.object({
        dayLabel: z.string().default("Mon"),
        status: z.string().default("NOT_DONE"),
        isToday: z.boolean().default(false),
      }),
    )
    .default(() => [
      { dayLabel: "Mon", status: "NOT_DONE", isToday: false },
      { dayLabel: "Tue", status: "NOT_DONE", isToday: false },
      { dayLabel: "Wed", status: "DONE", isToday: false },
      { dayLabel: "Thur", status: "NOT_DONE", isToday: false },
      { dayLabel: "Fri", status: "NOT_DONE", isToday: false },
      { dayLabel: "Sat", status: "NOT_DONE", isToday: true },
      { dayLabel: "Sun", status: "NOT_UP_COMING", isToday: false },
    ]),
});

export const sendMailPayloadSchema = z.object({
  templateName: z
    .enum([templateNameEnum.RESET_PASSWORD, templateNameEnum.REMIND_STREAK])
    .default(templateNameEnum.RESET_PASSWORD),
  subject: z.string().default("Subject"),
  data: z.union([resetPasswordPayloadSchema, profileStreakActivitySchema]),
});
