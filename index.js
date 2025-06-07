import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Apply middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Define routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Connect to MongoDB then start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
