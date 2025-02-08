
// const Team = require("../models/team");
// const { validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");

// const teamRepository = require("../repositories/team_repository");

// // next error handling과 res.send() error handling이 같이 쓰이는데 이거 기준이 뭔가요?

// exports.getTeamList = async () => {
//     try {
//         const teamList = await teamRepository.getAllTeams();
//         if(teamList == null) {
//             throw new Error("Teams not found");
//         }
//         return teamList;
//     } catch (err) {
//         if(err.message = "Teams not found") {
//             throw err;
//         }
//         throw new Error("Failed to get team list from database");
//     }
// }; // only for admin

// exports.getTeamDetail = async (teamId) => {
//     try {
//         const team = await teamRepository.getTeamById(teamId);
//         if(team == null) {
//             throw new Error("Team not found");
//         }
//         return team;
//     } catch (err) {
//         if(err.message == "Team not found") {
//             throw err;
//         }
//         // throw new Error("Failed to get team data from database");
//         throw err;
//     }
// };

// // Will implement search

// exports.createTeam = async (username, password, name) => {
//     try {
//         const teamExists = await teamRepository.findNotDeletedTeamByName(username);
//         if(teamExists) {
//             throw new Error("A Team with the same username already exists");
//         }
//     } catch (err) {
//         if(err.message == "A Team with the same username already exists") {
//             throw err;
//         }
//         throw new Error("Failed to get team data from database");
//     }
//     // encrypt the password
//     const hashedPwd = await bcrypt.hash(password, 10);
//     // store new user
//     const newTeam = new Team({
//         username: username, 
//         password: hashedPwd,
//         name: name,
//         roles: ["User", ],
//     });
//     try {
//         const createdTeam = await teamRepository.saveTeam(newTeam);
//         if(createdTeam == null) throw new Error();
//         return createdTeam;
//     } catch (err) {
//         throw new Error("Failed to save team to database");
//     }
// } 

// exports.updateTeam = async (team, id) => {
//     try {
//         const updatedTeam = await teamRepository.findByIdAndUpdate(team, id);
//         if (updatedTeam == null) {
//             throw new Error("Team not found");
//         }
//     } catch (err) {
//         if(err.message == "Team not found") {
//             throw err;
//         }
//         throw err;
//     }
// };