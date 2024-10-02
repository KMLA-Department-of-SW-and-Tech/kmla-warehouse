const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const teamService = require("../services/team_service");
const borrowHistoryService = require("../services/borrow_history_service");
const teamRepository = require("../repositories/team_repository");

// next error handling과 res.send() error handling이 같이 쓰이는데 이거 기준이 뭔가요?

exports.team_list = asyncHandler(async (req, res, next) => {
    try {
        const teamList = await teamService.getTeamList();
        res.status(200).send(teamList);
        return;
    } catch (err) {
        if(err.message == "Failed to get team list from database") {
            res.status(404).send(err.message);
            return;
        }
        if(err.message == "Teams not found") {
            res.status(404).send(err.message);
            return;
        }
        res.status(500).send({error: "Internal Server Error"});
        return;
    }
}); // only for admin

exports.team_detail = asyncHandler(async (req, res, next) => {
    try {
        const team = await teamService.getTeamDetail(req.params.id);
        res.status(200).json( {_id: team._id, username: team.username, name: team.name} );
        return;
    } catch (err) {
        if(err.message == "Team not found") {
            res.status(404).send(err.message);
            return;
        }
        if(err.message == "Failed to get team data from database") {
            res.status(404).send(err.message);
            return;
        }
        res.status(500).send({error: "Internal Server Error"});
        return;
    }
});

// Will implement search

exports.team_create = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(200).send(errors.array());
            return;
        }
        else {
            const { username, password, name } = req.body;
            try {
                const newTeam = await teamService.createTeam(username, password, name);
                res.status(201).send("Successfully registered team");
                return;
            } catch (err) {
                if(err.message == "Failed to get team data from database") {
                    res.status(404).send(err.message);
                    return;
                }
                if(err.message == "A Team with the same username already exists") {
                    res.status(409).send(err.message);
                    return;
                }
                if(err.message == "Failed to save team to database") {
                    res.status(500).send(err);
                    return;
                }
                res.status(500).send("Internal Server Error");
                return;
            }
        }
    })
];

exports.team_update_put = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(200).send(errors.array());
            return;
        }
        else {
            // const {username, password, name, refreshToken} = req.body;
            const id = req.params.id;
            try {
                const updatedTeam = await teamService.updateTeam(req.body, id);
            } catch (err) {
                if(err.message == "Team not found") {
                    res.status(404).send(err);
                    return;
                }
                res.status(500).send(err);
                return;
            }
            res.status(200).send("Successfuly updated team");
            return;
        }
    }),
];

// exports.team_update_patch = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: team update patch");
// });

exports.team_borrow_list = asyncHandler(async (req, res, next) => {
    try {
        const borrowList = await borrowHistoryService.getBorrowList(req.params.id);
        res.status(200).send(borrowList);
        return;
    } catch (err) {
        if(err.message == "Failed to get borrow list from database") {
            res.status(404).send(err.message);
            return;
        }
        if(err.message == "Borrow history not found") {
            res.status(404).send(err.message);
            return;
        }
        res.status(500).send({error: "Internal Server Error"});
        return;
    }
});

exports.team_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team delete");
});

exports.update_current_team_password = asyncHandler(async (req, res, next) => {
    // newName: dfd, currentPassword, newPassword: dsfs, 
    console.log(req.body, req.username);
    //const [] = req.body;
    //console.log(currentPassword, newPassword, "hi")
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    console.log(currentPassword, newPassword, req.username);
    const currentUser = await teamRepository.findTeamByName(req.username);
    console.log(currentUser);

    const match = await bcrypt.compare(currentPassword, currentUser.password);
    if(!match) return res.status(401).send("Current Password does not match");
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    currentUser.password = hashedPwd;
    await currentUser.save();
    res.status(200).send("Successful change");

})