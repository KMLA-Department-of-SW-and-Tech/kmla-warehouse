const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    id: {type: String, required: true, maxLength: 100},
    pw: {type: String, required: true, maxLength: 100},
});

module.exports = mongoose.model("Team", teamSchema);