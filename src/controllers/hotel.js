const Hotel = require("../model/Hotel");
const mongoose = require("mongoose");
const { validateHotel } = require("../validations/hotelValidation");

const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({});
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: "Hotels not found" });
        }
        res.status(200).json(hotels);
    } catch (error) {
        res.status({ message: error.message });
    }
};

const createHotel = async (req, res) => {
    try {

        const newHotel = new Hotel(req.body);

        const validationErrors = validateHotel(newHotel);
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const saveHotel = await newHotel.save();

        res.status(200).json(saveHotel);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({ message: "Please provide a valid ID" });
        }

        const getHotelByID = await Hotel.findById(id);
        if (!getHotelByID) {
            return res
                .status(404)
                .json({ message: `Record not found of this ID ${id}` });
        }
        res.status(200).json(getHotelByID);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateHotel = async (req, res) => {
    try {
        const { name, location, description, price } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ message: "Invalid ID provided For Updating Record" });
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(id, {
            name,
            location,
            description,
            price,
        }, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });

        }
        res.status(200).json(updatedHotel);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deletHotel = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Record ID For Delete" });
        }
        await Hotel.findByIdAndDelete(id);
        res.status(200).json("Hotel deleted successfully");
    } catch (error) {
        res.status({ error: error.message });
    }
};


module.exports = {
    getHotels,
    createHotel,
    getHotelById,
    updateHotel,
    deletHotel
};
