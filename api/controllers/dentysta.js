const mongoose = require("mongoose");
const Dentysta = require("../models/dentysta");

// Pobranie wszystkich dentystów z możliwością filtrowania
exports.getAllDentists = (req, res) => {
  const { id, imie, nazwisko, telefon, email, specjalizacja } = req.query;

  let filter = {};

  if (id) {
    filter["_id"] = id;
  } else {
    if (imie) filter["imie"] = new RegExp(imie, "i");
    if (nazwisko) filter["nazwisko"] = new RegExp(nazwisko, "i");
    if (telefon) filter["telefon"] = new RegExp(telefon, "i");
    if (email) filter["email"] = new RegExp(email, "i");
    if (specjalizacja) filter["specjalizacja"] = new RegExp(specjalizacja, "i");
  }

  Dentysta.find(filter)
    .then(dentysci => {
      if (dentysci.length > 0) {
        res.status(200).json(dentysci);
      } else {
        res.status(404).json({ message: "Nie znaleziono dentystów spełniających podane kryteria" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Dodanie nowego dentysty
exports.createDentist = (req, res, next) => {
  const dentysta = new Dentysta({
    _id: new mongoose.Types.ObjectId(),
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    specjalizacja: req.body.specjalizacja,
    godziny_pracy: req.body.godziny_pracy,
    telefon: req.body.telefon,
    email: req.body.email,
  });

  dentysta.save()
    .then(result => {
      res.status(201).json({
        message: "Dentysta dodany",
        dentysta: result,
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

// Usuwanie dentysty po ID
exports.deleteDentistById = (req, res, next) => {
  const id = req.params.id;

  Dentysta.findByIdAndDelete(id)
    .then(deletedDentist => {
      if (deletedDentist) {
        res.status(200).json({ message: "Dentysta usunięty", dentysta: deletedDentist });
      } else {
        res.status(404).json({ message: "Nie znaleziono dentysty o podanym ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};
