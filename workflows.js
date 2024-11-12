import { workflow } from "@novu/framework";
import { z } from "zod";
import {
  announceStreakMilestoneControllSchema,
  announceStreakMilestonePayloadSchema,
  profileStreakActivitySchema,
  remindMissingStreakControllSchema,
  remindMissingStreakPayloadSchema,
  remindStreakControllSchema,
  remindStreakPayloadSchema,
  resetPasswordPayloadSchema,
  sendMailControllSchema,
} from "./schemas.js";
import { renderTemplate } from "./utils.js";

export const testWorkflow = workflow(
  "test-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-email",
      async (controls) => {
        return {
          subject: controls.subject,
          body: "This is your first Novu Email " + payload.userName,
        };
      },
      {
        controlSchema: z.object({
          subject: z
            .string()
            .default("A Successful Test on Novu from {{userName}}"),
        }),
      },
    );
  },
  {
    payloadSchema: z.object({
      userName: z.string().default("John Doe"),
    }),
  },
);

export const sentOtpWorkflow = workflow(
  "send-otp-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-mail",
      async (controls) => {
        return {
          subject: controls.subject,
          body: await renderTemplate(payload.templateName, payload.data),
        };
      },
      {
        controlSchema: sendMailControllSchema,
      },
    );
  },
  {
    payloadSchema: resetPasswordPayloadSchema,
  },
);

export const remindStreakWorkflow = workflow(
  "remind-streak-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-mail",
      async (controls) => {
        return {
          subject: controls.subject,
          body: await renderTemplate(payload.templateName, payload.data),
        };
      },
      {
        controlSchema: remindStreakControllSchema,
      },
    );
  },
  {
    payloadSchema: remindStreakPayloadSchema,
  },
);

export const remindMissingStreakWorkflow = workflow(
  "remind-missing-streak-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-mail",
      async (controls) => {
        return {
          subject: controls.subject,
          body: await renderTemplate(payload.templateName, payload.data),
        };
      },
      {
        controlSchema: remindMissingStreakControllSchema,
      },
    );
  },
  {
    payloadSchema: remindMissingStreakPayloadSchema,
  },
);

export const announceStreakMilestoneWorkflow = workflow(
  "announce-streak-milestone-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-mail",
      async (controls) => {
        return {
          subject: controls.subject,
          body: await renderTemplate(payload.templateName, payload.data),
        };
      },
      {
        controlSchema: announceStreakMilestoneControllSchema,
      },
    );
  },
  {
    payloadSchema: announceStreakMilestonePayloadSchema,
  },
);
