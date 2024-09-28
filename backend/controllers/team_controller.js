const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const teamService = require("../services/team_service");

// next error handling과 res.send() error handling이 같이 쓰이는데 이거 기준이 뭔가요?

exports.team_list = asyncHandler(async (req, res, next) => {
    try {
        const teamList = await teamService.getTeamList();
        res.status(200).send(teamList);
    } catch (err) {
        if(err.message == "Failed to get team list from database") {
            res.status(404).send(err.message);
        }
        if(err.message == "Teams not found") {
            res.status(404).send(err.message);
        }
        res.status(500).send({error: "Internal Server Error"});
    }
}); // only for admin

exports.team_detail = asyncHandler(async (req, res, next) => {
    try {
        const team = await teamService.getTeamDetail(req.params.id);
        res.status(200).json( {_id: team._id, username: team.username, name: team.name} );
    } catch (err) {
        if(err.message == "Team not found") {
            res.status(404).send(err.message);
        }
        if(err.message == "Failed to get team data from database") {
            res.status(404).send(err.message);
        }
        res.status(500).send({error: "Internal Server Error"});
    }
});

// Will implement search

exports.team_create = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(200).send(errors.array());
        }
        else {
            const { username, password, name } = req.body;
            try {
                const newTeam = await teamService.createTeam(username, password, name);
                res.status(201).send("Successfully registered team");
            } catch (err) {
                if(err.message == "Failed to get team data from database") {
                    res.status(404).send(err.message);
                }
                if(err.message == "A Team with the same username already exists") {
                    res.status(409).send(err.message);
                }
                res.status(500).send("Internal Server Error");
            }
        }
    })
];

exports.team_update_put = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.status(200).send(errors.array());
        }
        else {
            // const {username, password, name, refreshToken} = req.body;
            const id = req.params.id;
            try {
                const updatedTeam = await teamService.updateTeam(req.body, id);
            } catch (err) {
                res.status(500).send(err);
            }
            res.status(200).send("Successfuly updated team");
        }
    }),
];

// exports.team_update_patch = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: team update patch");
// });

exports.team_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team delete");
});