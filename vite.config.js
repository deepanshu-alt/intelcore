import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { normalizePayload, sendContactInquiry, validatePayload } from "./contactApi.js";

dotenv.config({ quiet: true });

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "dev-contact-api",
      configureServer(server) {
        server.middlewares.use("/api/contact", async (req, res, next) => {
          if (req.method !== "POST") {
            next();
            return;
          }

          try {
            const payload = normalizePayload(await readJsonBody(req));
            const errors = validatePayload(payload);

            res.setHeader("Content-Type", "application/json");

            if (Object.keys(errors).length > 0) {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, errors }));
              return;
            }

            await sendContactInquiry(payload);

            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                message: "Your inquiry has been sent successfully.",
              }),
            );
          } catch (error) {
            console.error("Vite contact form send failed:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                message: "Unable to send your inquiry right now. Please try again shortly.",
              }),
            );
          }
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("@react-three/fiber")
            ) {
              return "r3f-stack";
            }
            if (id.includes("/three/")) {
              return "three-core";
            }
            if (id.includes("framer-motion")) {
              return "motion-stack";
            }
            if (id.includes("react-router")) {
              return "router-stack";
            }
            if (id.includes("react-dom") || id.includes("/react/")) {
              return "react-stack";
            }
          }
        },
      },
    },
  },
});
