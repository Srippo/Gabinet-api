const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pacjent = require("../models/pacjent");

router.get("/", (req, res) => {
    Pacjent.find()
        .then(pacjenci => res.status(200).json(pacjenci))
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie pacjentów po imieniu i nazwisku
router.get("/search", (req, res) => {
    const imie = req.query.imie || "";
    const nazwisko = req.query.nazwisko || "";
    const query = {
        imie: new RegExp(imie, "i"),
        nazwisko: new RegExp(nazwisko, "i")
    };

    Pacjent.find(query)
        .then(pacjenci => {
            if (pacjenci.length > 0) {
                res.status(200).json(pacjenci);
            } else {
                res.status(404).json({ message: "Nie znaleziono pacjentów o podanych danych" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie pacjentów po numerze telefonu
router.get("/search-by-phone", (req, res) => {
    const telefon = req.query.telefon;

    if (!telefon) {
        return res.status(400).json({ message: "Podaj numer telefonu w zapytaniu" });
    }

    Pacjent.findOne({ telefon: telefon })
        .then(pacjent => {
            if (pacjent) {
                res.status(200).json(pacjent);
            } else {
                res.status(404).json({ message: "Nie znaleziono pacjenta o podanym numerze telefonu" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});


router.post("/", (req, res) => {
    const pacjent = new Pacjent({
        _id: new mongoose.Types.ObjectId(),
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        data_urodzenia: req.body.data_urodzenia,
        plec: req.body.plec,
        telefon: req.body.telefon,
        email: req.body.email
    });

    pacjent.save()
        .then(result => res.status(201).json({ message: "Pacjent dodany", pacjent: result }))
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
