const express = require("express");
const router = express.Router();
const pacjent = require("../controllers/pacjent");
const authMiddleware = require('../middleware/auth');

// Pobranie wszystkich pacjentów
router.get("/", authMiddleware, pacjent.getAllPatients);

// Dodanie nowego pacjenta
router.post("/", authMiddleware, pacjent.createPatient);

// Usuwanie pacjenta po ID
router.delete("/:id", authMiddleware, pacjent.deletePatientById);

module.exports = router;
