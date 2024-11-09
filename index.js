import express from "express";
import { serve } from "@novu/framework/express";
import { testWorkflow, sentOtpWorkflow } from "./workflows.js";
import { Novu } from "@novu/node";
import dotenv from "dotenv";
import { renderTemplate } from "./utils.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/novu", serve({ workflows: [testWorkflow, sentOtpWorkflow] }));

app.get("/", (req, res) => {
  res.status(200).send("pong");
});

app.post("/send-mail", (res, req) => {
  try {
    const client = new Novu(process.env.NOVU_SECRET_KEY);

    console.log("trigger send mail");

    client.trigger("send-otp-workflow", {
      to: {
        subscriberId: "6727412c456590b1d8992b87",
        to: "bddquan@gmail.com",
      },
      overrides: {
        email: {
          senderName: "LapinLearn",
          integrationIdentifier: "novu-email-gDDBDg5yq",
        },
      },
      payload: {
        otp: "123456",
      },
    });

    console.log("Trigger done");
  } catch (err) {
    console.log("error: ", err);
  }
  req.status(200).json({
    message: "Trigger message done",
  });
});

app.post("/layouts", async (req, res) => {
  try {
    const client = new Novu(process.env.NOVU_SECRET_KEY);
    const templateName = req.body.templateName;
    const payload = {
      content: await renderTemplate(templateName),
      description: req.body.description,
      name: templateName,
      identifier: templateName,
      variables: [
        {
          type: "String",
          name: "body",
          required: true,
          defValue: "",
        },
      ],
      isDefault: "false",
    };

    const layout = await client.layouts.create(payload);
    res.status(200).json({
      message: "create successfully",
      ...layout,
    });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({
      message: "fail to create layouts",
    });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
