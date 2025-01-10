const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Zabieg = require("../models/zabieg");

// Pobranie wszystkich zabiegów
router.get("/", (req, res) => {
    Zabieg.find()
        .then(zabiegi => res.status(200).json(zabiegi))
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie zabiegu po nazwie
router.get("/search", (req, res) => {
    const nazwa = req.query.nazwa;

    Zabieg.find({ nazwa: new RegExp(nazwa, "i") })
        .then(zabiegi => {
            if (zabiegi.length > 0) {
                res.status(200).json(zabiegi);
            } else {
                res.status(404).json({ message: "Nie znaleziono zabiegów o podanej nazwie" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie zabiegu po ID
router.get("/:zabiegId", (req, res) => {
    const id = req.params.zabiegId;
    Zabieg.findById(id)
        .then(zabieg => {
            if (zabieg) {
                res.status(200).json(zabieg);
            } else {
                res.status(404).json({ message: "Nie znaleziono zabiegu" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Aktualizacja danych zabiegu
router.put("/:zabiegId", (req, res) => {
    const id = req.params.zabiegId;
    const updateFields = req.body;

    Zabieg.updateOne({ _id: id }, { $set: updateFields })
        .then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: "Zabieg zaktualizowany", result });
            } else {
                res.status(404).json({ message: "Nie znaleziono zabiegu o podanym ID" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});


// Dodanie nowego zabiegu
router.post("/", (req, res) => {
    const zabieg = new Zabieg({
        _id: new mongoose.Types.ObjectId(),
        nazwa: req.body.nazwa,
        opis: req.body.opis,
        cena: req.body.cena,
        czas_trwania: req.body.czas_trwania
    });

    zabieg.save()
        .then(result => res.status(201).json({ message: "Zabieg dodany", zabieg: result }))
        .catch(err => res.status(500).json({ error: err }));
});

// Usunięcie zabiegu
router.delete("/:zabiegId", (req, res) => {
    const id = req.params.zabiegId;
    Zabieg.deleteOne({ _id: id })
        .then(result => res.status(200).json({ message: "Zabieg usunięty" }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
