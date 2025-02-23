const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema({
    user: {type: String, required: true},
    item: {type: Schema.Types.ObjectId, ref: "Item", required: true},
    quantity: {type: Number, required: true},
    timestamp: {type: Schema.Types.Date, required: true, default: Date.now()},
    type: {type: String, enum: ["borrow", "return", "delete"]},
    reference: {type: Schema.Types.ObjectId},
    status: {type: String, enum: ["active", "closed"], default: "active"},
});

module.exports = mongoose.model("Logs", logSchema);

//로그에 기록될 수 있는 연산
//대여, 반납, 삭제, 