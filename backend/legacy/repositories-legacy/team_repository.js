
// const Team = require("../models/team");
// const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");

// // next error handling과 res.send() error handling이 같이 쓰이는데 이거 기준이 뭔가요?

// exports.getAllTeams = async () => {
//     const teamList = await Team.find({})
//     .sort({ name: 1, })
//     .exec();
//     return teamList;
// }; // only for admin

// exports.getTeamById = async (teamId) => {
//     const team = await Team.findById(teamId, {}).exec();
//     return team;
// };

// // Will implement search

// exports.createTeam = async (username, hashedPwd, name) => {
//     const newTeam = new Team({
//         username: username, 
//         password: hashedPwd,
//         name: name,
//     });
//     return await newTeam.save();
// };

// exports.findTeamByName = async (username) => {
//     const team = await Team.findOne({username: username})
//     .collation({ locale: "en_US", strength: 2 })
//     .exec();
//     return team;
// };

// exports.findNotDeletedTeamByName = async (username) => {
//     const team = await Team.findOne({username: username, status: "valid"})
//     .collation({ locale: "en_US", strength: 2 })
//     .exec();
//     return team;
// };

// exports.saveTeam = async (team) => {
//     const newTeam = await team.save();
//     console.log(newTeam)
//     return newTeam;
// }

// exports.findByIdAndUpdate = async (team, id) => {
//     team._id = id;
//     return await Team.findByIdAndUpdate(id, team, {});
// }
