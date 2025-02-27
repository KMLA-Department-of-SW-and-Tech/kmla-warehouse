const mongoose = require("mongoose");
const teamNameList = require("../config/team-config").teamNameList;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // user: {type: String, required: true},
    // item: {type: Schema.Types.ObjectId, ref: "Item", required: true},
    // quantity: {type: Number, required: true},
    // timestamp: {type: Schema.Types.Date, required: true, default: Date.now()},
    // type: {type: String, enum: ["borrow", "return"]},
    // status: {type: String, enum: ["active", "closed"], default: "active"},
    firebaseUid: { type: String, required: true },
    userType: { type: String, enum: ["User", "Admin"] },
    teamName: { type: String, enum: teamNameList },
});

module.exports = mongoose.model("User", userSchema);

//유저의 인적사항항