const express = require("express");
const Car = require("../models/Car");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

function addImageUrl(car, req) {
  return {
    ...car.toObject(),
    imageUrl: `${req.protocol}://${req.get("host")}/public/cars/${car.image}`,
  };
}

router.get("/", async (req, res) => {
  const cars = await Car.find();
  const carsWithImageUrls = cars.map((car) => addImageUrl(car, req));
  res.json(carsWithImageUrls);
});

router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    const carWithImageUrl = addImageUrl(car, req);
    res.json(carWithImageUrl);
  } else {
    res.status(404).send("Car not found");
  }
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
