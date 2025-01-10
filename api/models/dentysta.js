const mongoose = require("mongoose");

const dentystaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    specjalizacja: { type: String, required: true },
    godziny_pracy: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    telefon: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model("Dentysta", dentystaSchema);
