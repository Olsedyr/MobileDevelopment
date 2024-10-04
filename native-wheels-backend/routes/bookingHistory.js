const express = require("express");
const BookingHistory = require("../models/BookingHistory");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Use authentication middleware
router.use(authMiddleware);

// Route to fetch the booking history for a logged-in user
router.get("/", async (req, res) => {
    try {
        const bookingHistory = await BookingHistory.find({ userId: req.user.id }).populate("carId");
        res.json(bookingHistory);
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ message: "Error fetching booking history" });
    }
});

// Add a new booking to the history (could be called when a booking is completed)
router.post("/add", async (req, res) => {
    try {
        const { carId, fromBookingDate, toBookingDate } = req.body;

        const newHistory = new BookingHistory({
            userId: req.user.id,
            carId: carId,
            fromBookingDate: fromBookingDate,
            toBookingDate: toBookingDate,
            completedAt: new Date(),
        });

        await newHistory.save();
        res.status(201).json(newHistory);
    } catch (error) {
        console.error("Error adding booking history:", error);
        res.status(500).json({ message: "Error adding booking to history" });
    }
});

module.exports = router;
