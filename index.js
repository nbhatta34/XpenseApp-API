const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const colors = require("colors");
const cors = require("cors")
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

dotenv.config();

app.use(express.static(__dirname + '/images'));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`Connected to MongoDB ${mongoose.connection.host}`.magenta.underline.bold);

});
app.use(express.json());
const auth = require("./routes/auth");

app.use("/auth", auth);

const PORT = process.env.PORT || 5000;


app.listen(
    PORT, "0.0.0.0",
    console.log(
        `Server running in mode : ${process.env.NODE_ENV}, on Port : ${PORT}`.blue.bold
    ));
