const mongoose = require("mongoose");
const Wizyta = require("../models/wizyta");

// Pobranie wszystkich wizyt z możliwością filtrowania
exports.getAll = async (req, res) => {
  const { imie_pacjenta, nazwisko_pacjenta, imie_dentysty, nazwisko_dentysty, data } = req.query;

  let filter = {};

  if (imie_pacjenta || nazwisko_pacjenta) {
    const pacjentFilter = {};
    if (imie_pacjenta) pacjentFilter["imie"] = new RegExp(imie_pacjenta, "i");
    if (nazwisko_pacjenta) pacjentFilter["nazwisko"] = new RegExp(nazwisko_pacjenta, "i");

    const pacjenci = await mongoose.model("Pacjent").find(pacjentFilter).select("_id");
    const pacjentIds = pacjenci.map(p => p._id);
    if (pacjentIds.length > 0) {
      filter["id_pacjenta"] = { $in: pacjentIds };
    }
  }

  if (imie_dentysty || nazwisko_dentysty) {
    const dentystaFilter = {};
    if (imie_dentysty) dentystaFilter["imie"] = new RegExp(imie_dentysty, "i");
    if (nazwisko_dentysty) dentystaFilter["nazwisko"] = new RegExp(nazwisko_dentysty, "i");

    const dentyści = await mongoose.model("Dentysta").find(dentystaFilter).select("_id");
    const dentystaIds = dentyści.map(d => d._id);
    if (dentystaIds.length > 0) {
      filter["id_dentysty"] = { $in: dentystaIds };
    }
  }

  if (data) {
    filter["data"] = new Date(data);
  }

  // Wyszukiwanie wizyt z filtrem
  Wizyta.find(filter)
    .populate("id_pacjenta", "imie nazwisko")
    .populate("id_dentysty", "imie nazwisko specjalizacja")
    .populate("wykonane_zabiegi.id_zabiegu", "nazwa opis cena")
    .then(wizyty => {
      if (wizyty.length > 0) {
        res.status(200).json(wizyty);
      } else {
        res.status(404).json({ message: "Nie znaleziono wizyt spełniających podane kryteria" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};


// Dodanie nowej wizyty
exports.create = (req, res) => {
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
};

// Pobranie wizyty po ID
exports.getById = (req, res) => {
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
};

// Usuwanie wizyty po ID
exports.deleteById = (req, res) => {
    const id = req.params.wizytaId;
  
    Wizyta.findByIdAndDelete(id)
      .then(deletedWizyta => {
        if (deletedWizyta) {
          res.status(200).json({ message: "Wizyta została usunięta", wizyta: deletedWizyta });
        } else {
          res.status(404).json({ message: "Nie znaleziono wizyty o podanym ID" });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  };
  