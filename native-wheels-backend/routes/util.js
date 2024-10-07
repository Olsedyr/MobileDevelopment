function addImageUrl(car, req) {
  return {
    ...car.toObject(),
    imageUrl: `${req.protocol}://${req.get("host")}/public/cars/${car.image}`,
  }
}

module.exports = { addImageUrl }
