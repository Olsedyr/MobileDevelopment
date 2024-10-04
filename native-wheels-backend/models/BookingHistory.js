const mongoose = require("mongoose");

const bookingHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    fromBookingDate: { type: Date, required: true },
    toBookingDate: { type: Date, required: true },
    completedAt: { type: Date, required: true }, // Date when booking was moved to history
});

module.exports = mongoose.model("BookingHistory", bookingHistorySchema);
