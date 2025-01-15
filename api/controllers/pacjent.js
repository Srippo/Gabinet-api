const mongoose = require("mongoose");
const Pacjent = require("../models/pacjent");

// Pobranie wszystkich pacjentów z możliwością filtrowania
exports.getAllPatients = (req, res) => {
  const { id, imie, nazwisko, telefon, email } = req.query;

  let filter = {};

  if (id) {
    filter["_id"] = id;
  } else {
    if (imie) filter["imie"] = new RegExp(imie, "i");
    if (nazwisko) filter["nazwisko"] = new RegExp(nazwisko, "i");
    if (telefon) filter["telefon"] = new RegExp(telefon, "i");
    if (email) filter["email"] = new RegExp(email, "i");
  }

  Pacjent.find(filter)
    .then(pacjenci => {
      if (pacjenci.length > 0) {
        res.status(200).json(pacjenci);
      } else {
        res.status(404).json({ message: "Nie znaleziono pacjentów spełniających podane kryteria" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Dodanie nowego pacjenta
exports.createPatient = (req, res) => {
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
    .then(result => {
      res.status(201).json({ message: "Pacjent dodany", pacjent: result });
    })
    .catch(err => res.status(500).json({ error: err }));
};

// Usuwanie pacjenta po ID
exports.deletePatientById = (req, res) => {
  const id = req.params.id;

  Pacjent.findByIdAndDelete(id)
    .then(deletedPacjent => {
      if (deletedPacjent) {
        res.status(200).json({ message: "Pacjent usunięty", pacjent: deletedPacjent });
      } else {
        res.status(404).json({ message: "Nie znaleziono pacjenta o podanym ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};
