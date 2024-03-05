const express = require('express');
const hotelRoutes = require("./src/routes/hotel");
require("dotenv").config();
require("./config/database");



const app = express();

app.use(express.json());


app.use("/hotel", hotelRoutes);

app.get("/", (req, res) => {
    res.send("Hello Node Application");
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});