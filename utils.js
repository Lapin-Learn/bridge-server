import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

export async function renderTemplate(templateName, data) {
  try {
    // Resolve the directory and template path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(
      __dirname,
      "templates",
      `${templateName}.hbs`,
    );

    // Read the Handlebars template file
    const templateContent = await fs.promises.readFile(templatePath, "utf-8");

    // Compile the Handlebars template with provided data
    const compiledTemplate = handlebars.compile(templateContent);
    const html = compiledTemplate(data);

    return html;
  } catch (error) {
    console.error("Error rendering template:", error);
    throw error;
  }
}
