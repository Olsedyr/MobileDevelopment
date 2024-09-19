const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car");

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

const dummyCars = [
  {
    make: "Lamborghini",
    model: "Aventador LP750-4 SV",
    year: 2022,
    available: true,
    image: "aventador.webp",
  },
  {
    make: "Porsche",
    model: "Panamera Turbo",
    year: 2017,
    available: true,
    image: "panamera.webp",
  },
  {
    make: "Porsche",
    model: "911 GT3 Touring",
    year: 2022,
    available: true,
    image: "gt3touring.webp",
  },
  {
    make: "Mercedes",
    model: "G63 AMG",
    year: 2018,
    available: true,
    image: "gwagon.webp",
  },
  {
    make: "Bentley",
    model: "Continental GT",
    year: 2014,
    available: true,
    image: "bentley.webp",
  },
];

const seedCars = async () => {
  await connectDB();

  await Car.deleteMany({});
  const result = await Car.insertMany(dummyCars);
  console.log(`${result.length} cars added.`);

  mongoose.connection.close();
};

seedCars();
