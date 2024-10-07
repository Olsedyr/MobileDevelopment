const express = require('express');
const BookingHistory = require('../models/BookingHistory');
const authMiddleware = require('../middleware/auth');
const { addImageUrl } = require('./util');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const bookingHistory = await BookingHistory.find({
      userId: req.user.id,
    }).populate('carId');

    const bookingHistoryWithImageUrls = bookingHistory.map((booking) => {
      const carWithImageUrl = addImageUrl(booking.carId, req);
      return {
        ...booking.toObject(),
        carId: carWithImageUrl,
      };
    });

    res.json(bookingHistoryWithImageUrls);
    console.log(bookingHistoryWithImageUrls);
  } catch (error) {
    console.error('Error fetching booking history:', error);
    res.status(500).json({ message: 'Error fetching booking history' });
  }
});

module.exports = router;
