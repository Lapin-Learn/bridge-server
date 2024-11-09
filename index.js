import express from "express";
import { serve } from "@novu/framework/express";
import { testWorkflow } from "./workflows.js";
import { Novu } from "@novu/node";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/novu", serve({ workflows: [testWorkflow] }));

app.get("/", (req, res) => {
  res.status(200).send("pong");
});

app.post("/send-mail", (res, req) => {
  try {
    const client = new Novu(process.env.NOVU_SECRET_KEY);

    console.log("trigger send mail");

    client.trigger("test-workflow", {
      to: {
        subscriberId: "6727412c456590b1d8992b87",
      },
      overrides: {
        email: {
          to: ["bddquan@gmail.com"],
          senderName: "LapinLearn",
          integrationIdentifier: "novu-email-gDDBDg5yq",
        },
      },
      payload: {
        userName: "John Doe",
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

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
