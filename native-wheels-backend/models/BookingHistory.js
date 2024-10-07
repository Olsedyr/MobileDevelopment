const mongoose = require("mongoose")

const bookingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  fromBookingDate: { type: Date, required: true },
  toBookingDate: { type: Date, required: true },
  completedAt: { type: Date, default: Date.now },
})

const BookingHistory = mongoose.model("BookingHistory", bookingHistorySchema)

module.exports = BookingHistory
