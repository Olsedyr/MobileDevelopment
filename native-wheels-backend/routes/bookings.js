const express = require("express");
const Booking = require("../models/Booking");
const BookingHistory = require("../models/BookingHistory"); // Import BookingHistory model
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

// Function to move expired bookings to history
const moveExpiredBookingsToHistory = async (userId) => {
  const now = new Date();
  const expiredBookings = await Booking.find({
    userId: userId,
    toBookingDate: { $lt: now }, // Check for expired bookings
  }).populate("carId");

  if (expiredBookings.length > 0) {
    // Create history records
    const historyRecords = expiredBookings.map((booking) => ({
      userId: booking.userId,
      carId: booking.carId,
      fromBookingDate: booking.fromBookingDate,
      toBookingDate: booking.toBookingDate,
      completedAt: now,
    }));

    await BookingHistory.insertMany(historyRecords); // Insert into history

    // Remove expired bookings
    await Booking.deleteMany({ _id: { $in: expiredBookings.map((b) => b._id) } });
  }
};

router.get("/", async (req, res) => {
  try {
    // Move expired bookings to history
    await moveExpiredBookingsToHistory(req.user.id);

    // Fetch current bookings
    const bookings = await Booking.find({ userId: req.user.id }).populate("carId");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { carId, fromBookingDate, toBookingDate } = req.body;
    const booking = new Booking({
      userId: req.user.id,
      carId: carId,
      fromBookingDate: fromBookingDate,
      toBookingDate: toBookingDate,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

module.exports = router;
