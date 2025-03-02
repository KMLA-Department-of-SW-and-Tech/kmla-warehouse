const mongoose = require("mongoose");
const { teamNameList } = require("../config/team-config");

const Schema = mongoose.Schema;

const logSchema = new Schema({
    teamName: {type: String, enum: teamNameList, required: true},
    item: {type: Schema.Types.ObjectId, ref: "Item", required: true},
    quantity: {type: Number, required: true},
    timestamp: {type: Schema.Types.Date, required: true, default: Date.now()},
    type: {type: String, enum: ["borrow", "return"]},
    status: {type: String, enum: ["active", "closed"], default: "active"},
});

module.exports = mongoose.model("Logs", logSchema);

//로그에 기록될 수 있는 연산
//대여, 반납, 삭제, 