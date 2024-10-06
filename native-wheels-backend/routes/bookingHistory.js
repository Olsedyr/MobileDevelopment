const express = require("express");
const BookingHistory = require("../models/BookingHistory");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);


function addImageUrl(booking, req) {

    const car = booking.carId;
    return {
        ...booking.toObject(),
        imageUrl: car ? `${req.protocol}://${req.get("host")}/public/cars/${car.image}` : null,
    };
}


router.get("/", async (req, res) => {
    try {
        const history = await BookingHistory.find({ userId: req.user.id }).populate("carId");
        const historyWithImageUrls = history.map((booking) => addImageUrl(booking, req)); // Pass the entire booking object
        res.json(historyWithImageUrls);
        console.log(historyWithImageUrls)
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ message: "Error fetching booking history" });
    }
});

module.exports = router;
