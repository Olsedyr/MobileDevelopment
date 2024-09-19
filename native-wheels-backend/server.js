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

// Routes (add your routes here)
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);
// Sample route to get a list of cars
app.get("/api/cars", (req, res) => {
  res.json({ message: "List of cars" });
});

// Sample route to book a car
app.post("/api/cars/book", (req, res) => {
  const { carId } = req.body; // Assuming you send carId in the request body
  res.json({ message: `Car with ID ${carId} booked successfully!` });
});

// Call the connectDB function to initiate the connection
connectDB();
