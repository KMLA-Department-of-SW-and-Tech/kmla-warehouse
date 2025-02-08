// const teamRepository = require("../repositories/team_repository");

// const deleteTeam = async (req, res, next) => {
//     let team = null;
//     try {
//         team = await teamRepository.getTeamById(req.params.id);
//         if(team == null) {
//             throw new Error("Team not Found");
//         }
//     } catch (err) {
//         return next(err);
//     }
//     req.body = team;
//     req.body.status = "deleted";
//     next();
// };

// module.exports = deleteTeam;
