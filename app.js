require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// Połączenie z MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@filip.lat9w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routing
const pacjentRoutes = require("./api/router/pacjenci");
app.use("/pacjenci", pacjentRoutes);

// Obsługa błędów
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = app;
