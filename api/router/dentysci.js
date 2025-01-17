const express = require("express");
const router = express.Router();
const dentysta = require("../controllers/dentysta");
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Pobranie wszystkich dentystów
router.get("/", authMiddleware, dentysta.getAllDentists);

// Dodanie nowego dentysty (tylko dla admina)
router.post("/", authMiddleware, checkRole('admin'), dentysta.createDentist);

// Usuwanie dentysty po ID (tylko dla admina)
router.delete("/:id", authMiddleware, checkRole('admin'), dentysta.deleteDentistById);

// Aktualizowanie dentysty po ID (tylko dla admina)
router.patch("/:id", authMiddleware, checkRole('admin'), dentysta.updateDentistById);

module.exports = router;
