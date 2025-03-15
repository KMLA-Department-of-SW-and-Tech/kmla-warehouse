const mongoose = require("mongoose");
const teamConfig = require("../config/team-config");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseUid: { type: String, required: true },
  userType: {
    type: String,
    enum: ["User", "Admin", "Unauthorized"],
    required: true,
  },
  userName: { type: String },
  userGrade: { type: Number },
  userClassNumber: { type: Number },
  userStudentNumber: { type: Number },
  teamName: {
    type: String,
    enum: teamConfig.teamNameList.concat([teamConfig.noTeamNameAvailable]),
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
