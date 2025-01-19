const mongoose = require("mongoose");

const pacjentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    data_urodzenia: { type: Date, required: false },
    plec: { type: String, required: true },
    telefon: { type: String, required: true },
    email: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model("Pacjent", pacjentSchema, "patients");