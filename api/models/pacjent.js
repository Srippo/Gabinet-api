const mongoose = require("mongoose");

const pacjentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    data_urodzenia: { type: Date, required: false },
    plec: { type: String, required: false },
    telefon: { type: String, required: false },
    email: { type: String, required: false }
});

module.exports = mongoose.model("Pacjent", pacjentSchema, "patients");