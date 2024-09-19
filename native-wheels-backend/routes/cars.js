const express = require("express");
const Car = require("../models/Car");

const router = express.Router();

// Get all cars
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Get car details
router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json(car);
});

// Book a car (simplified, you might want to implement a more robust booking system)
router.post("/:id/book", async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car && car.available) {
    car.available = false;
    await car.save();
    res.send("Car booked");
  } else {
    res.status(400).send("Car not available");
  }
});

module.exports = router;
