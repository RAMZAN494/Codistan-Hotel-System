const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();


const localDataBaseUrl = process.env.LOCAL_MONGODB_URL;

mongoose
    .connect(localDataBaseUrl)
    .then(() => {
        console.log("Connected to MongoDB ");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error.message);
    });