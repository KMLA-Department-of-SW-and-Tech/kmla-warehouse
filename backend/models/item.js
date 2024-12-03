const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, maxLength: 1000},
    /* tags: {type: [Schema.Types.ObjectId], ref: "Tag"}, */
    totalQuantity: {type: Number, required: true},
    availableQuantity: {type: Number, required: true},
    location: {type: String, maxLength: 100},
    /* category: {type: Schema.Types.ObjectId, ref: "Category"}, */
    status: {type: String, enum: ["available", "deleted"], default: "available"},
    imageUrl: {type: String},
    imageKey: {type: String}
});

module.exports = mongoose.model("Item", itemSchema);