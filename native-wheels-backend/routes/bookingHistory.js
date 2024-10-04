const express = require("express");
const BookingHistory = require("../models/BookingHistory");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

// Fetch booking history for a user
router.get("/", async (req, res) => {
    try {
        const history = await BookingHistory.find({ userId: req.user.id }).populate("carId");
        res.json(history);
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ message: "Error fetching booking history" });
    }
});

module.exports = router;
