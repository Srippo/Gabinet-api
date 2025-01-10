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
