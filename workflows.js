import { workflow } from "@novu/framework";
import { z } from "zod";
import {
  resetPassworControllSchema,
  resetPasswordPayloadSchema,
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
      "send-otp",
      async (controls) => {
        return {
          subject: controls.subject,
          body: await renderTemplate("reset-password", payload),
        };
      },
      {
        controlSchema: resetPassworControllSchema,
      },
    );
  },
  {
    payloadSchema: resetPasswordPayloadSchema,
  },
);
