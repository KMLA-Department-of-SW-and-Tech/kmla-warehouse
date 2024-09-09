const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const borrowHistorySchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: "Item", required: true},
    quantity: {type: Number, required: true},
    borrower: {type: Schema.Types.ObjectId, ref: "Team", required: true},
    borrow_date: {type: Date, required: true},
    return_date: {type: Date, required: true},
})

module.exports = mongoose.model("BorrowHistory", borrowHistorySchema);