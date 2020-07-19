const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const storageSchema = Schema({
    location: {
        type: String,
        enum: ["chiller", "freezer", "pantry", "sauces"],
    },
    name: String,
    quantity: String,
    expiry: Date,
});

const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;