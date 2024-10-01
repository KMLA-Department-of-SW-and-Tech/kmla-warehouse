const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const borrowHistorySchema = new Schema({
    item: {type: Schema.Types.ObjectId, ref: "Item", required: true},
    quantity: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: "Team", required: true},
    timestamp: {type: Schema.Types.Date, required: true, default: Date.now},
    type: {type: String, enum: ["borrow", "return", "delete"]}
    // borrowDate: {type: Date, required: true},
    // returnDate: {type: Date/* , required: true */},
});

module.exports = mongoose.model("BorrowHistory", borrowHistorySchema);

//로그에 기록될 수 있는 연산
//대여, 반납, 삭제, 