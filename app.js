require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASSWORD;
const mongoCluster = process.env.DB_CLUSTER;
const mongoDBName = process.env.DB_NAME;
const mongoAuth = process.env.DB_AUTH || "mongodb";

const mongoURI = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}.${mongoAuth}.net/${mongoDBName}?retryWrites=true&w=majority`;

// Połączenie z MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Połączono z MongoDB"))
  .catch((err) => console.error("Błąd połączenia z MongoDB:", err));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routing
const pacjentRoutes = require("./api/router/pacjenci");
app.use("/pacjenci", pacjentRoutes);

const dentystaRoutes = require("./api/router/dentysci");
app.use("/dentysci", dentystaRoutes);

const zabiegRoutes = require("./api/router/zabiegi");
app.use("/zabiegi", zabiegRoutes);

const wizytaRoutes = require("./api/router/wizyty");
app.use("/wizyty", wizytaRoutes);

const zaplanowaneWizytaRoutes = require("./api/router/zaplanowaneWizyty");
app.use("/zaplanowaneWizyty", zaplanowaneWizytaRoutes);

const userRoutes = require("./api/router/userRoutes");
app.use("/userRoutes", userRoutes);

// Obsługa błędów
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = app;
