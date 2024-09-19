const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Start the server after a successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Import and use the auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const carRoutes = require("./routes/cars");
app.use("/api/cars", carRoutes);

// Call the connectDB function to initiate the connection
connectDB();
