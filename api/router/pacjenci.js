const express = require("express");
const router = express.Router();
const pacjent = require("../controllers/pacjent");

// Pobranie wszystkich pacjentów
router.get("/", pacjent.getAllPatients);

// Dodanie nowego pacjenta
router.post("/", pacjent.createPatient);

// Usuwanie pacjenta po ID
router.delete("/:id", pacjent.deletePatientById);

module.exports = router;
