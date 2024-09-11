const Team = require("../models/team");
const asyncHandler = require("express-async-handler");

exports.team_list = asyncHandler(async (req, res, next) => {
    const data = await Team.find({}, "name").sort({ name: 1, }).exec()
    res.json(data);
}); // only for admin

exports.team_detail = asyncHandler(async (req, res, next) => {
    const data = await Team.findById(req.params.id, "name username").exec();
    res.json(data);
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