const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  fromBookingDate: { type: Date, required: true },
  toBookingDate: { type: Date, required: true },
})

module.exports = mongoose.model("Booking", bookingSchema)
