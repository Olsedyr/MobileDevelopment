const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate(
    "carId"
  );
  res.json(bookings);
});

router.post("/", async (req, res) => {
  try {
    const { carId, fromBookingDate, toBookingDate } = req.body;
    const booking = new Booking({
      userId: req.user.id,
      carId: carId,
      fromBookingDate: fromBookingDate,
      toBookingDate: toBookingDate
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
});


module.exports = router;
