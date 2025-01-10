const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Wizyta = require("../models/wizyta");

// Wyszukiwanie wizyt po imieniu i nazwisku pacjenta
router.get("/search-by-patient", (req, res) => {
    const imie = req.query.imie || "";
    const nazwisko = req.query.nazwisko || "";

    Wizyta.find()
        .populate({
            path: "id_pacjenta",
            match: { imie: new RegExp(imie, "i"), nazwisko: new RegExp(nazwisko, "i") }
        })
        .populate("id_dentysty", "imie nazwisko specjalizacja")
        .populate("wykonane_zabiegi.id_zabiegu", "nazwa opis cena")
        .then(wizyty => {
            const filteredWizyty = wizyty.filter(wizyta => wizyta.id_pacjenta !== null);
            if (filteredWizyty.length > 0) {
                res.status(200).json(filteredWizyty);
            } else {
                res.status(404).json({ message: "Nie znaleziono wizyt dla podanego pacjenta" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie wizyt po imieniu i nazwisku dentysty
router.get("/search-by-dentist", (req, res) => {
    const imie = req.query.imie || "";
    const nazwisko = req.query.nazwisko || "";

    Wizyta.find()
        .populate("id_pacjenta", "imie nazwisko")
        .populate({
            path: "id_dentysty",
            match: { imie: new RegExp(imie, "i"), nazwisko: new RegExp(nazwisko, "i") }
        })
        .populate("wykonane_zabiegi.id_zabiegu", "nazwa opis cena")
        .then(wizyty => {
            const filteredWizyty = wizyty.filter(wizyta => wizyta.id_dentysty !== null);
            if (filteredWizyty.length > 0) {
                res.status(200).json(filteredWizyty);
            } else {
                res.status(404).json({ message: "Nie znaleziono wizyt dla podanego dentysty" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Wyszukiwanie wizyt po nazwie przeprowadzonego zabiegu
router.get("/search-by-procedure", (req, res) => {
    const nazwa = req.query.nazwa || "";

    Wizyta.find()
        .populate("id_pacjenta", "imie nazwisko")
        .populate("id_dentysty", "imie nazwisko specjalizacja")
        .populate({
            path: "wykonane_zabiegi.id_zabiegu",
            match: { nazwa: new RegExp(nazwa, "i") }
        })
        .then(wizyty => {
            const filteredWizyty = wizyty.filter(wizyta =>
                wizyta.wykonane_zabiegi.some(zabieg => zabieg.id_zabiegu !== null)
            );
            if (filteredWizyty.length > 0) {
                res.status(200).json(filteredWizyty);
            } else {
                res.status(404).json({ message: "Nie znaleziono wizyt z podanym zabiegiem" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

// Pobranie wszystkich wizyt
router.get("/", (req, res) => {
    Wizyta.find()
        .populate("id_pacjenta", "imie nazwisko")
        .populate("id_dentysty", "imie nazwisko specjalizacja")
        .populate("wykonane_zabiegi.id_zabiegu", "nazwa opis cena")
        .then(wizyty => res.status(200).json(wizyty))
        .catch(err => res.status(500).json({ error: err }));
});

// Dodanie nowej wizyty
router.post("/", (req, res) => {
    const wizyta = new Wizyta({
        _id: new mongoose.Types.ObjectId(),
        id_pacjenta: req.body.id_pacjenta,
        id_dentysty: req.body.id_dentysty,
        data: req.body.data,
        platnosc: req.body.platnosc,
        koszt_wizyty: req.body.koszt_wizyty,
        uwagi_wizyta: req.body.uwagi_wizyta,
        wykonane_zabiegi: req.body.wykonane_zabiegi
    });

    wizyta.save()
        .then(result => res.status(201).json({ message: "Wizyta dodana", wizyta: result }))
        .catch(err => res.status(500).json({ error: err }));
});

// Pobranie wizyty po ID
router.get("/:wizytaId", (req, res) => {
    const id = req.params.wizytaId;
    Wizyta.findById(id)
        .populate("id_pacjenta", "imie nazwisko")
        .populate("id_dentysty", "imie nazwisko specjalizacja")
        .populate("wykonane_zabiegi.id_zabiegu", "nazwa opis cena")
        .then(wizyta => {
            if (wizyta) {
                res.status(200).json(wizyta);
            } else {
                res.status(404).json({ message: "Nie znaleziono wizyty" });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
