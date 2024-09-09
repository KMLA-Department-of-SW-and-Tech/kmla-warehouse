const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    desc: {type: String, maxLength: 1000},
    // photo will be added later
    status: {type: String, required: true, enum: ["Available", "Loaned", "Maintenance"]},
    due_back: {type: Date},
    borrower: {type: Schema.Types.ObjectId, ref: "Team", required: true},
});

module.exports = mongoose.model("Item", itemSchema);