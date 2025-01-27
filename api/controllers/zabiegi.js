const mongoose = require("mongoose");
const Zabieg = require("../models/zabieg");

// Pobranie wszystkich zabiegów z możliwością filtrowania
exports.getAll = (req, res) => {
    const { id_zabiegu, nazwa, opis, cena, minCena, maxCena, czas_trwania } = req.query;

    let filter = {};

    if (id_zabiegu) filter["_id"] = id_zabiegu;

    if (nazwa) filter["nazwa"] = new RegExp(nazwa, "i");

    if (opis) filter["opis"] = new RegExp(opis, "i");
    
    if (cena) {
        filter["cena"] = parseFloat(cena);
    } else if (minCena || maxCena) {
        filter["cena"] = {};
        if (minCena) filter["cena"]["$gte"] = parseFloat(minCena);
        if (maxCena) filter["cena"]["$lte"] = parseFloat(maxCena);
    }

    if (czas_trwania) filter["czas_trwania"] = parseInt(czas_trwania, 10);

    Zabieg.find(filter)
        .then(zabiegi => {
            if (zabiegi.length > 0) {
                res.status(200).json(zabiegi);
            } else {
                res.status(404).json({ message: "Nie znaleziono zabiegów spełniających podane kryteria" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};


// Aktualizacja danych zabiegu
exports.updateById = (req, res) => {
    const id = req.params.zabiegId;
    const updateFields = req.body;

    Zabieg.findByIdAndUpdate(id, { $set: updateFields }, { new: true, runValidators: true })
        .then(updatedZabieg => {
            if (updatedZabieg) {
                res.status(200).json({
                    message: "Zabieg zaktualizowany",
                    zabieg: updatedZabieg,
                });
            } else {
                res.status(404).json({ message: "Nie znaleziono zabiegu o podanym ID" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};


// Dodanie nowego zabiegu
exports.create = (req, res) => {
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
};

// Usunięcie zabiegu
exports.deleteById = (req, res) => {
    const id = req.params.zabiegId;
    Zabieg.deleteOne({ _id: id })
        .then(() => res.status(200).json({ message: "Zabieg usunięty" }))
        .catch(err => res.status(500).json({ error: err }));
};
