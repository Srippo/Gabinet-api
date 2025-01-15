const mongoose = require("mongoose");

const zaplanowanaWizytaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    pacjent: { type: mongoose.Types.ObjectId, ref: "Pacjent", required: true },
    telefon: { type: String, required: true },
    termin: { type: Date, required: true },
    lekarz: { type: mongoose.Types.ObjectId, ref: "Dentysta", required: true },
    potwierdzona: { type: Boolean, required: true },
    zrealizowana: { type: Boolean, required: true },
});

module.exports = mongoose.model("ZaplanowanaWizyta", zaplanowanaWizytaSchema, "planned_visits");