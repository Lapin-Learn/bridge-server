import express from "express";
import { serve } from "@novu/framework/express";
import { testWorkflow } from "./workflows.js";

const app = express();
app.use(express.json());
app.use("/api/novu", serve({ workflows: [testWorkflow] }));

//await publishWorkflows();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
