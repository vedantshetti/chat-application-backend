const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config();

const connectDB = async () => {
    try {
        const mongoose = require('mongoose');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;