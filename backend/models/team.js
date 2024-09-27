const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    username: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true, maxLength: 100},
    name: {type: String, required: true, maxLength: 100},
    roles: {type: [String], required: true},
    refreshToken: { type: [String], required: false },
});

module.exports = mongoose.model("Team", teamSchema);