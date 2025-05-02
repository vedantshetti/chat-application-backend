import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import connectDB from './config/database.js';

const app = express();
dotenv.config();

app.use(express.json());

//routes
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server only after successfully connecting to the database
    app.use(express.json());
    app.use(cors());

    //routes
    app.use("/api/v1/user", userRoute);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });