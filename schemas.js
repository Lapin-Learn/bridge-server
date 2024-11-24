import { z } from "zod";
import { templateNameEnum } from "./enum.js";

export const sendMailControllSchema = z.object({
  subject: z.string().default("{{subject}}"),
});

export const remindStreakControllSchema = z.object({
  subject: z
    .string()
    .default(
      "Chào {{data.username}}, đừng đánh mất {{data.currentStreak}} ngày streak nhé!",
    ),
});

export const remindMissingStreakControllSchema = z.object({
  subject: z
    .string()
    .default("Chào {{data.username}}, cùng bắt đầu lại chuỗi streak nhé!"),
});

export const announceStreakMilestoneControllSchema = z.object({
  subject: z
    .string()
    .default(
      "Chào {{data.username}}! Nối dài chuỗi {{data.currentStreak}} ngày học IELTS nào!",
    ),
});

export const resetPasswordPayloadSchema = z.object({
  templateName: z.string().default(templateNameEnum.RESET_PASSWORD),
  data: z.object({ otp: z.string().length(6).default("123456") }),
  subject: z.string().default("[NO-REPLY] LapinLearn Reset Password"),
});

export const verifyEmailPayloadSchema = z.object({
  templateName: z.string().default(templateNameEnum.VERIFY_MAIL),
  data: z.object({ otp: z.string().length(6).default("123456") }),
  subject: z.string().default("Welcome to LapinLearn"),
});

export const profileStreakActivitySchema = z.object({
  templateName: z.string(),
  data: z.object({
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
      .length(7)
      .default(() => [
        { dayLabel: "Sun", status: "DONE", isToday: false },
        { dayLabel: "Mon", status: "NOT_DONE", isToday: false },
        { dayLabel: "Tue", status: "NOT_DONE", isToday: false },
        { dayLabel: "Wed", status: "DONE", isToday: true },
        { dayLabel: "Thu", status: "NOT_UP_COMING", isToday: false },
        { dayLabel: "Fri", status: "NOT_UP_COMING", isToday: false },
        { dayLabel: "Sat", status: "NOT_UP_COMING", isToday: false },
      ]),
  }),
});

export const remindStreakPayloadSchema = profileStreakActivitySchema.extend({
  templateName: z.string().default(templateNameEnum.REMIND_STREAK),
});

export const remindMissingStreakPayloadSchema =
  profileStreakActivitySchema.extend({
    templateName: z.string().default(templateNameEnum.REMIND_MISSING_STREAK),
  });

export const announceStreakMilestonePayloadSchema =
  profileStreakActivitySchema.extend({
    templateName: z
      .string()
      .default(templateNameEnum.ANNOUNCE_STREAK_MILESTONE),
  });
