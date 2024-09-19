const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car"); // Adjust the path if necessary

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

// Dummy car data
const dummyCars = [
  { make: "Toyota", model: "Camry", year: 2020, available: true },
  { make: "Honda", model: "Civic", year: 2019, available: true },
  { make: "Ford", model: "Focus", year: 2021, available: false },
  { make: "Chevrolet", model: "Malibu", year: 2018, available: true },
];

// Seed the database
const seedCars = async () => {
  await connectDB();

  await Car.deleteMany({}); // Clear existing data
  const result = await Car.insertMany(dummyCars); // Insert dummy data
  console.log(`${result.length} cars added.`);

  mongoose.connection.close(); // Close the connection
};

// Run the seed function
seedCars();
