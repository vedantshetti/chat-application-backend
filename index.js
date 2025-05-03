import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// Apply middleware
app.use(express.json());
app.use(cookieParser()); // This was missing
app.use(cors({
  origin: 'http://localhost:3000', // or your frontend URL
  credentials: true // Important for cookies to work with CORS
}));

// Define routes
app.use("/api/v1/user", userRoute);

// Connect to MongoDB then start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
