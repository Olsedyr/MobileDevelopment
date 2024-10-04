// models/BookingHistory.js
const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carId: {
        make: String,
        model: String,
        year: Number,
        price: Number,
        imageUrl: String,
        required: true,
    },
    fromBookingDate: { type: Date, required: true },
    toBookingDate: { type: Date, required: true },
    completedAt: { type: Date, required: true },
});

module.exports = mongoose.model('BookingHistory', bookingHistorySchema);
