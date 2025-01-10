const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pacjent = require("../models/pacjent");

// Lista wszystkich pacjentów
router.get("/", (req, res, next) => {
    Pacjent.find()
        .then(pacjenci => res.status(200).json(pacjenci))
        .catch(err => res.status(500).json({ error: err }));
});

// Dodanie nowego pacjenta
router.post("/", (req, res, next) => {
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
