const express = require("express");
const router = express.Router();
const wizyty = require("../controllers/wizyty");
const authMiddleware = require("../middleware/auth");

// Pobranie wszystkich wizyt
router.get("/", authMiddleware, wizyty.getAll);

// Dodanie nowej wizyty
router.post("/", authMiddleware, wizyty.create);

// Usuwanie wizyty po ID
router.delete("/:wizytaId", authMiddleware, wizyty.deleteById);

module.exports = router;
