const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, maxLength: 1000},
    totalQuantity: {type: Number, required: true},
    quantity: {type: Number, required: true},
    location: {type: String, maxLength: 100},
    status: {type: String, enum: ["valid", "deleted"], default: "valid"},
    imageUrl: {type: String},
    imageKey: {type: String}
});

module.exports = mongoose.model("Item", itemSchema);