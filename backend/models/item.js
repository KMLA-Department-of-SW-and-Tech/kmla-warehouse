const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, maxLength: 1000},
    tags: {type: [Schema.Types.ObjectId], ref: "Tag"},
    total_quantity: {type: Number, required: true},
    available_quantity: {type: Number, required: true},
    location: {type: String, maxLength: 100},
    // photo will be added later
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    status: {type: String, enum: ["대여가능", "대여중", "대여불가", "삭제됨"]}
});

module.exports = mongoose.model("Item", itemSchema);