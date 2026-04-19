import dotenv from "dotenv";
import express from "express";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { normalizePayload, sendContactInquiry, validatePayload } from "./contactApi.js";

dotenv.config({ quiet: true });

const app = express();
const port = Number(process.env.PORT || 8787);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const payload = normalizePayload(req.body);

  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    await sendContactInquiry(payload);

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your inquiry right now. Please try again shortly.",
    });
  }
});

if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Contact API running on http://localhost:${port}`);
});
