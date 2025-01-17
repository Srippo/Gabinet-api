const express = require("express");
const router = express.Router();
const zaplanowaneWizyty = require("../controllers/zaplanowaneWizyty");
const authMiddleware = require("../middleware/auth");

// Pobranie wszystkich zaplanowanych wizyt
router.get("/", authMiddleware, zaplanowaneWizyty.getAll);

// Dodanie nowej zaplanowanej wizyty
router.post("/", authMiddleware, zaplanowaneWizyty.add);

// Usuwanie zaplanowanej wizyty po ID
router.delete("/:wizytaId", authMiddleware, zaplanowaneWizyty.deleteById);

module.exports = router;
