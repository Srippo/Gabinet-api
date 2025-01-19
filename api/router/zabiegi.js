const express = require("express");
const router = express.Router();
const zabiegi = require("../controllers/zabiegi");
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Pobranie wszystkich zabiegów
router.get("/", authMiddleware, zabiegi.getAll);

// Aktualizacja danych zabiegu
router.patch("/:zabiegId", authMiddleware, zabiegi.updateById);

// Dodanie nowego zabiegu (tylko admin)
router.post("/", authMiddleware, checkRole("admin"), zabiegi.create);

// Usunięcie zabiegu (tylko admin)
router.delete("/:zabiegId", authMiddleware, checkRole("admin"), zabiegi.deleteById);

module.exports = router;
