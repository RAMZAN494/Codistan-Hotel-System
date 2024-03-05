const express = require("express");
const { getHotels, createHotel, getHotelById, deletHotel, updateHotel } = require("../controllers/hotel");

const router = express.Router();

router.get('/', getHotels);
router.post("/create", createHotel);
router.get("/:id", getHotelById);
router.put("/:id", updateHotel);
router.delete("/:id", deletHotel);
module.exports = router;