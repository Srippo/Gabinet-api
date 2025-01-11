const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ZaplanowanaWizyta = require("../models/zaplanowaneWizyty");

// Pobranie wszystkich zaplanowanych wizyt
router.get("/", (req, res) => {
    ZaplanowanaWizyta.find()
        .populate("pacjent", "imie nazwisko") 
        .populate("lekarz", "imie nazwisko specjalizacja") 
        .then(wizyty => res.status(200).json(wizyty))
        .catch(err => res.status(500).json({ error: err }));
});

// Dodanie nowej zaplanowanej wizyty
router.post("/", (req, res) => {
    const zaplanowanaWizyta = new ZaplanowanaWizyta({
        _id: new mongoose.Types.ObjectId(),
        pacjent: req.body.pacjent,
        kontakt: req.body.kontakt,
        termin: req.body.termin,
        lekarz: req.body.lekarz,
        potwierdzona: req.body.potwierdzona,
        zrealizowana: req.body.zrealizowana
    });

    zaplanowanaWizyta.save()
        .then(result => res.status(201).json({ message: "Zaplanowana wizyta dodana", wizyta: result }))
        .catch(err => res.status(500).json({ error: err }));
});

// Pobranie zaplanowanej wizyty po ID
router.get("/:wizytaId", (req, res) => {
    const id = req.params.wizytaId;
    ZaplanowanaWizyta.findById(id)
        .populate("pacjent", "imie nazwisko")
        .populate("lekarz", "imie nazwisko specjalizacja")
        .then(wizyta => {
            if (wizyta) {
                res.status(200).json(wizyta);
            } else {
                res.status(404).json({ message: "Nie znaleziono zaplanowanej wizyty" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;