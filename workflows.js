import { workflow } from "@novu/framework";
import { z } from "zod";
import {
  profileStreakActivitySchema,
  resetPasswordPayloadSchema,
  sendMailControllSchema,
  sendMailPayloadSchema,
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
  "send-mail-workflow",
  async ({ step, payload }) => {
    await step.email(
      "send-data-to-mail",
      async (controls) => {
        let schema;
        if (payload.templateName === "reset-password") {
          schema = resetPasswordPayloadSchema;
        } else {
          schema = profileStreakActivitySchema;
        }

        payload.data = schema.parse(payload);
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
    payloadSchema: sendMailPayloadSchema,
  },
);
