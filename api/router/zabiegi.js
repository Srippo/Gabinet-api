const express = require("express");
const router = express.Router();
const zabiegi = require("../controllers/zabiegi");

// Pobranie wszystkich zabiegów
router.get("/", zabiegi.getAll);

// Wyszukiwanie zabiegu po ID
router.get("/:zabiegId", zabiegi.getById);

// Aktualizacja danych zabiegu
router.put("/:zabiegId", zabiegi.updateById);

// Dodanie nowego zabiegu
router.post("/", zabiegi.create);

// Usunięcie zabiegu
router.delete("/:zabiegId", zabiegi.deleteById);

module.exports = router;
