const Team = require("../models/team");
const asyncHandler = require("express-async-handler");

exports.team_list = asyncHandler(async (req, res, next) => {
    const teamList = await Team.find({}, "name")
    .sort({ name: 1, })
    .exec();
    if(teamList == null) {
        const err = new Error("Teams not found");
        err.status = 404;
        return next(err);
    }
    res.send(teamList);
}); // only for admin

exports.team_detail = asyncHandler(async (req, res, next) => {
    const team = await Team.findById(req.params.id).exec();
    if(team == null) {
        const err = new Error("Team not found");
        err.status = 404;
        return next(err);
    }
    res.json(team);
});

// Will implement search

exports.team_create = asyncHandler(async (req, res, next) => {
    
    res.send("NOT IMPLEMENTED: team create");
});

exports.team_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team update put");
});

// exports.team_update_patch = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: team update patch");
// });

exports.team_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team delete");
});