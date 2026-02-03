const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('CRITICAL: MONGODB_URI is not defined in environment variables.');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Do not use process.exit(1) as it crashes the Vercel function worker
    }
};

module.exports = connectDB;
