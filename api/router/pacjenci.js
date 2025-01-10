const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pacjent = require("../models/pacjent");

router.get("/", (req, res) => {
    Pacjent.find()
        .then(pacjenci => res.status(200).json(pacjenci))
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
