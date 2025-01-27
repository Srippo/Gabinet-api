const mongoose = require("mongoose");

const wizytaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    pacjent: { type: mongoose.Types.ObjectId, ref: "Pacjent", required: true },
    dentysta: { type: mongoose.Types.ObjectId, ref: "Dentysta", required: true },
    data: { type: Date, required: true },
    platnosc: { type: Boolean, required: true },
    koszt_wizyty: { type: Number, required: true },
    uwagi_wizyta: { type: String, required: false },
    wykonane_zabiegi: [
        {
            id_zabiegu: { type: mongoose.Types.ObjectId, ref: "Zabieg", required: true },
            czas_trwania: { type: String, required: true },
            koszt: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model("Wizyta", wizytaSchema, "visits");
