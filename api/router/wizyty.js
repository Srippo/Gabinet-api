const express = require("express");
const router = express.Router();
const wizyty = require("../controllers/wizyty");

// Pobranie wszystkich wizyt
router.get("/", wizyty.getAll);

// Dodanie nowej wizyty
router.post("/", wizyty.create);

// Pobranie wizyty po ID
router.get("/:wizytaId", wizyty.getById);

// Usuwanie wizyty po ID
router.delete("/:wizytaId", wizyty.deleteById);

module.exports = router;
