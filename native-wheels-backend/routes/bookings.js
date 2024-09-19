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

module.exports = router;
