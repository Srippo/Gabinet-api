const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Dentysta = require("../models/dentysta");

// Pobranie wszystkich dentystów
router.get("/", (req, res, next) => {
    Dentysta.find()
        .then(dentysci => res.status(200).json(dentysci))
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie dentystów po imieniu i nazwisku
router.get("/search", (req, res) => {
    const imie = req.query.imie || "";
    const nazwisko = req.query.nazwisko || "";
    const query = {
        imie: new RegExp(imie, "i"),
        nazwisko: new RegExp(nazwisko, "i")
    };

    Dentysta.find(query)
        .then(dentysci => {
            if (dentysci.length > 0) {
                res.status(200).json(dentysci);
            } else {
                res.status(404).json({ message: "Nie znaleziono dentystów o podanych danych" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie dentystów po numerze telefonu
router.get("/search-by-phone", (req, res) => {
    const telefon = req.query.telefon;

    if (!telefon) {
        return res.status(400).json({ message: "Podaj numer telefonu w zapytaniu" });
    }

    Dentysta.findOne({ telefon: telefon })
        .then(dentysta => {
            if (dentysta) {
                res.status(200).json(dentysta);
            } else {
                res.status(404).json({ message: "Nie znaleziono dentysty o podanym numerze telefonu" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});


// Dodanie nowego dentysty
router.post("/", (req, res, next) => {
    const dentysta = new Dentysta({
        _id: new mongoose.Types.ObjectId(),
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        specjalizacja: req.body.specjalizacja,
        godziny_pracy: req.body.godziny_pracy,
        telefon: req.body.telefon,
        email: req.body.email
    });

    dentysta.save()
        .then(result => res.status(201).json({
            message: "Dentysta dodany",
            dentysta: result
        }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
