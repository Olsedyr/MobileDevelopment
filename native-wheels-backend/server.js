const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const initializeServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Start the server after a successful database connection
    startServer();
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/public', express.static('public'));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const carRoutes = require('./routes/cars');
app.use('/api/cars', carRoutes);

const bookingsRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingsRoutes);

const bookingHistoryRoutes = require('./routes/bookingHistory');
app.use('/api/booking-history', bookingHistoryRoutes);

// Run the server
initializeServer();
