const mongoose = require("mongoose");

const zabiegSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    nazwa: { type: String, required: true },
    opis: { type: String, required: true },
    cena: { type: Number, required: true },
    czas_trwania: { type: String, required: true }
});

module.exports = mongoose.model("Zabieg", zabiegSchema, "procedures");