const validateHotel = (hotelData) => {
    const errors = {};

    if (!hotelData.name) {
        errors.name = "Name is required";
    }

    if (!hotelData.location) {
        errors.location = "Location is required";
    }

    if (!hotelData.price) {
        errors.price = "Amount is required";
    }

    if (!hotelData.description) {
        errors.description = "Description is required";
    }

    return errors;
};

module.exports = {
    validateHotel,
};