const express = require("express");
const router = express.Router();
const dentysta = require("../controllers/dentysta");

// Pobranie wszystkich dentystów
router.get("/", dentysta.getAllDentists);

// Dodanie nowego dentysty
router.post("/", dentysta.createDentist);

// Usuwanie dentysty po ID
router.delete("/:id", dentysta.deleteDentistById);

module.exports = router;
