const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {type: String, maxLength: 100, required: true},
    password: {type: String, maxLength: 100, required: true},
});

module.exports = mongoose.model("Admin", adminSchema);