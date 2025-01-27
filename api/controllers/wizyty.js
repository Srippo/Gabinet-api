const mongoose = require("mongoose");
const Wizyta = require("../models/wizyta");

// Pobranie wszystkich wizyt z możliwością filtrowania
exports.getAll = async (req, res) => {
  const { id, imie_pacjenta, nazwisko_pacjenta, imie_dentysty, nazwisko_dentysty, specjalizacja_dentysty, data, platnosc, wykonane_zabiegi } = req.query;

  let filter = {};

  if (id) {
    if (mongoose.isValidObjectId(id)) {
      filter["_id"] = id;
    } else {
      return res.status(400).json({ message: "Nieprawidłowy format ID" });
    }
  }  

  if (imie_pacjenta || nazwisko_pacjenta) {
    const pacjentFilter = {};
    if (imie_pacjenta) pacjentFilter["imie"] = new RegExp(imie_pacjenta, "i");
    if (nazwisko_pacjenta) pacjentFilter["nazwisko"] = new RegExp(nazwisko_pacjenta, "i");

    const pacjenci = await mongoose.model("Pacjent").find(pacjentFilter).select("_id");
    const pacjentIds = pacjenci.map(p => p._id);
    if (pacjentIds.length > 0) {
      filter["pacjent"] = { $in: pacjentIds };
    }
  }

  if (imie_dentysty || nazwisko_dentysty || specjalizacja_dentysty) {
    const dentystaFilter = {};
    if (imie_dentysty) dentystaFilter["imie"] = new RegExp(imie_dentysty, "i");
    if (nazwisko_dentysty) dentystaFilter["nazwisko"] = new RegExp(nazwisko_dentysty, "i");
    if (specjalizacja_dentysty) dentystaFilter["specjalizacja"] = new RegExp(specjalizacja_dentysty, "i");

    const dentyści = await mongoose.model("Dentysta").find(dentystaFilter).select("_id");
    const dentystaIds = dentyści.map(d => d._id);
    if (dentystaIds.length > 0) {
      filter["dentysta"] = { $in: dentystaIds };
    }
  }

  if (data) {
    filter["data"] = new Date(data);
  }

  if (platnosc !== undefined) {
    filter["platnosc"] = platnosc === "true";
  }

  if (wykonane_zabiegi) {
    const zabiegFilter = { nazwa: new RegExp(wykonane_zabiegi, "i") };

    const zabiegi = await mongoose.model("Zabieg").find(zabiegFilter).select("_id");
    const zabiegIds = zabiegi.map(z => z._id);

    if (zabiegIds.length > 0) {
      filter["wykonane_zabiegi.id_zabiegu"] = { $in: zabiegIds };
    }
  }

  Wizyta.find(filter)
    .populate("pacjent", "imie nazwisko")
    .populate("dentysta", "imie nazwisko specjalizacja")
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
  const { pacjent, dentysta, data, platnosc, koszt_wizyty, uwagi_wizyta, wykonane_zabiegi } = req.body;

  const wizyta = new Wizyta({
    _id: new mongoose.Types.ObjectId(),
    pacjent,
    dentysta,
    data,
    platnosc,
    koszt_wizyty,
    uwagi_wizyta,
    wykonane_zabiegi: wykonane_zabiegi.map(zabieg => ({
      id_zabiegu: zabieg.id_zabiegu,
      czas_trwania: zabieg.czas_trwania,
      koszt: zabieg.koszt
    }))
  });

  wizyta
    .save()
    .then(result => res.status(201).json({ message: "Wizyta dodana", wizyta: result }))
    .catch(err => res.status(500).json({ error: err }));
};

// Usuwanie wizyty po ID
exports.deleteById = (req, res) => {
  const id = req.params.wizytaId;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Nieprawidłowy format ID" });
  }

  Wizyta.findByIdAndDelete(id) // Usuwamy filtr `dodanaPrzez`
    .then(deletedWizyta => {
      if (deletedWizyta) {
        res.status(200).json({ message: "Wizyta została usunięta", wizyta: deletedWizyta });
      } else {
        res.status(404).json({ message: "Nie znaleziono wizyty o podanym ID" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Aktualizacja wizyty po ID (dla zalogowanego użytkownika)
exports.updateById = (req, res) => {
  const id = req.params.wizytaId;
  const updateData = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Nieprawidłowy format ID" });
  }

  Wizyta.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .then(updatedWizyta => {
      if (!updatedWizyta) {
        return res.status(404).json({ message: "Nie znaleziono wizyty o podanym ID" });
      }

      res.status(200).json({
        message: "Wizyta zaktualizowana",
        wizyta: updatedWizyta,
      });
    })
    .catch(err => {
      console.error("Błąd podczas aktualizacji wizyty:", err.message);
      res.status(500).json({ error: err.message });
    });
};
