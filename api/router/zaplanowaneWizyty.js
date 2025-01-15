const express = require("express");
const router = express.Router();
const zaplanowaneWizyty = require("../controllers/zaplanowaneWizyty");

// Pobranie wszystkich zaplanowanych wizyt
router.get("/", zaplanowaneWizyty.getAll);

// Dodanie nowej zaplanowanej wizyty
router.post("/", zaplanowaneWizyty.add);

// Pobranie zaplanowanej wizyty po ID
router.get("/:wizytaId", zaplanowaneWizyty.getById);

// Usuwanie zaplanowanej wizyty po ID
router.delete("/:wizytaId", zaplanowaneWizyty.deleteById);

module.exports = router;
