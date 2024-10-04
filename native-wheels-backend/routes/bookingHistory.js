// routes/bookingHistory.js
const express = require('express');
const BookingHistory = require('../models/BookingHistory');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

// GET route to fetch booking history
router.get('/', async (req, res) => {
    try {
        const history = await BookingHistory.find({ userId: req.user.id }).populate('carId');
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking history', error });
    }
});

// Logic to move a completed booking to history
router.post('/complete-booking', async (req, res) => {
    const { bookingId } = req.body;

    try {
        // Find the current booking
        const booking = await Booking.findById(bookingId).populate('carId');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Create a new entry in BookingHistory
        const bookingHistory = new BookingHistory({
            userId: booking.userId,
            carId: {
                make: booking.carId.make,
                model: booking.carId.model,
                year: booking.carId.year,
                price: booking.carId.price,
                imageUrl: booking.carId.imageUrl,
            },
            fromBookingDate: booking.fromBookingDate,
            toBookingDate: booking.toBookingDate,
            completedAt: new Date(),
        });

        await bookingHistory.save();
        // Optionally, remove the completed booking from the `Booking` collection
        await Booking.findByIdAndDelete(bookingId);

        res.status(201).json(bookingHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error completing booking', error });
    }
});

module.exports = router;
