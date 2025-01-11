const mongoose = require("mongoose");

const zaplanowanaWizytaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    pacjent: { type: mongoose.Types.ObjectId, ref: "Pacjent", required: true }, // Pacjent
    telefon: { type: String, required: true }, // Numer kontaktowy pacjenta
    termin: { type: Date, required: true }, // Data i godzina wizyty
    lekarz: { type: mongoose.Types.ObjectId, ref: "Dentysta", required: true }, // Lekarz (dentysta)
    potwierdzona: { type: Boolean, required: true }, // Czy wizyta została potwierdzona
    zrealizowana: { type: Boolean, required: true }, // Czy wizyta została zrealizowana
});

module.exports = mongoose.model("ZaplanowanaWizyta", zaplanowanaWizytaSchema, "planned_visits");