const express = require("express");
const Car = require("../models/Car");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  res.json(car);
});

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
