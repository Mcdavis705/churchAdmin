import errorHandler from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";


import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

// Parse cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "PIWC Church ERP API",
    version: "1.0.0",
  });
});

export default app;

import prisma from "./lib/prisma.js";


app.use(errorHandler);

