const mongoose = require("mongoose");

const wizytaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    id_pacjenta: { type: mongoose.Types.ObjectId, ref: "Pacjent", required: true },
    id_dentysty: { type: mongoose.Types.ObjectId, ref: "Dentysta", required: true },
    data: { type: Date, required: true },
    platnosc: { type: Boolean, required: true },
    koszt_wizyty: { type: Number, required: true },
    uwagi_wizyta: { type: String, required: false },
    dodanaPrzez: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wykonane_zabiegi: [
        {
            id_zabiegu: { type: mongoose.Types.ObjectId, ref: "Zabieg", required: true },
            czas_trwania: { type: String, required: true },
            koszt: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model("Wizyta", wizytaSchema, "visits");
