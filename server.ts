import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import apiRouter from "./src/api";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Use JSON parsing with larger size limit for base64 images
app.use(express.json({ limit: '10mb' }));

// Mount API routes from src/api
app.use("/api", apiRouter);

async function startServer() {
  // Static serving for production / Vercel
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
