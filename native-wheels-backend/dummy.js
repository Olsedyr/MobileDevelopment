const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/Car');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

const dummyCars = [
  {
    make: 'Lamborghini',
    model: 'Aventador LP750-4 SV',
    year: 2022,
    available: true,
    image: 'aventador.webp',
    cylinders: 12,
    horsePower: 750,
    price: 8000,
  },
  {
    make: 'Porsche',
    model: 'Panamera Turbo',
    year: 2017,
    available: true,
    image: 'panamera.webp',
    cylinders: 8,
    horsePower: 550,
    price: 8000,
  },
  {
    make: 'Porsche',
    model: '911 GT3 Touring',
    year: 2022,
    available: true,
    image: 'gt3touring.webp',
    cylinders: 6,
    horsePower: 510,
    price: 8000,
  },
  {
    make: 'Mercedes',
    model: 'G63 AMG',
    year: 2018,
    available: true,
    image: 'gwagon.webp',
    cylinders: 8,
    horsePower: 585,
    price: 8000,
  },
  {
    make: 'Bentley',
    model: 'Continental GT',
    year: 2014,
    available: true,
    image: 'bentley.webp',
    cylinders: 8,
    horsePower: 507,
    price: 8000,
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
