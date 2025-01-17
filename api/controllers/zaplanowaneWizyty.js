const mongoose = require("mongoose");
const ZaplanowanaWizyta = require("../models/zaplanowaneWizyty");

// Pobranie wszystkich zaplanowanych wizyt z możliwością filtrowania
exports.getAll = async (req, res) => {
    const { id, imie, nazwisko, telefon, email } = req.query;

    let filter = {};

    if (id) {
        filter["_id"] = id;
    } else {
        let searchCriteria = [];

        if (telefon) searchCriteria.push({ telefon: new RegExp(telefon, "i") });

        if (imie || nazwisko || email) {
            let pacjentFilter = {};
            if (imie) pacjentFilter["imie"] = new RegExp(imie, "i");
            if (nazwisko) pacjentFilter["nazwisko"] = new RegExp(nazwisko, "i");
            if (email) pacjentFilter["email"] = new RegExp(email, "i");

            const pacjenci = await mongoose.model("Pacjent").find(pacjentFilter).select("_id");
            const pacjentIds = pacjenci.map(p => p._id);

            if (pacjentIds.length > 0) {
                searchCriteria.push({ pacjent: { $in: pacjentIds } });
            }
        }

        if (searchCriteria.length > 0) {
            filter["$or"] = searchCriteria;
        }
    }

    ZaplanowanaWizyta.find(filter)
        .populate("pacjent", "imie nazwisko email")
        .populate("lekarz", "imie nazwisko specjalizacja")
        .then(wizyty => {
            if (wizyty.length === 0) {
                return res.status(404).json({ message: "Brak wyników dla podanych kryteriów" });
            }
            res.status(200).json(wizyty);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Dodanie nowej zaplanowanej wizyty
exports.add = (req, res) => {
    const zaplanowanaWizyta = new ZaplanowanaWizyta({
        _id: new mongoose.Types.ObjectId(),
        pacjent: req.body.pacjent,
        telefon: req.body.telefon,
        termin: req.body.termin,
        lekarz: req.body.lekarz,
        potwierdzona: req.body.potwierdzona,
        zrealizowana: req.body.zrealizowana,
        dodanaPrzez: req.userData.userId
    });

    zaplanowanaWizyta.save()
        .then(result => res.status(201).json({ message: "Zaplanowana wizyta dodana", wizyta: result }))
        .catch(err => res.status(500).json({ error: err }));
};

// Usuwanie zaplanowanej wizyty po ID
exports.deleteById = (req, res) => {
    const id = req.params.wizytaId;

    ZaplanowanaWizyta.findByIdAndDelete(id)
        .then(deletedWizyta => {
            if (deletedWizyta) {
                res.status(200).json({ message: "Zaplanowana wizyta została usunięta", wizyta: deletedWizyta });
            } else {
                res.status(404).json({ message: "Nie znaleziono zaplanowanej wizyty o podanym ID" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Aktualizacja zaplanowanej wizyty po ID
exports.updateById = (req, res) => {
    const id = req.params.wizytaId;
    const updateFields = req.body;

    ZaplanowanaWizyta.findByIdAndUpdate(id, { $set: updateFields }, { new: true, runValidators: true })
        .then(updatedWizyta => {
            if (updatedWizyta) {
                res.status(200).json({
                    message: "Zaplanowana wizyta zaktualizowana",
                    wizyta: updatedWizyta,
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono zaplanowanej wizyty o podanym ID" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};
