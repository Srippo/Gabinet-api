const express = require("express");
const router = express.Router();
const zabiegi = require("../controllers/zabiegi");
const authMiddleware = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

// Pobranie wszystkich zabiegów
router.get("/", authMiddleware, zabiegi.getAll);

// Aktualizacja danych zabiegu
router.put("/:zabiegId", authMiddleware, zabiegi.updateById);

// Dodanie nowego zabiegu
router.post("/", authMiddleware, checkRole("admin"), zabiegi.create);

// Usunięcie zabiegu
router.delete("/:zabiegId", authMiddleware, checkRole("admin"), zabiegi.deleteById);

module.exports = router;
