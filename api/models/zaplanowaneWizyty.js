const mongoose = require("mongoose");

const zaplanowanaWizytaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    pacjent: { type: mongoose.Types.ObjectId, ref: "Pacjent", required: true },
    termin: { type: Date, required: true },
    lekarz: { type: mongoose.Types.ObjectId, ref: "Dentysta", required: true },
    potwierdzona: { type: Boolean, required: true },
    zrealizowana: { type: Boolean, required: true },
    dodanaPrzez: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("ZaplanowanaWizyta", zaplanowanaWizytaSchema, "planned_visits");