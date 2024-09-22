const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt")

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

exports.team_create = [
    asyncHandler(async (req, res, next) => {
        console.log(req.body)
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const teamExists = await Team.findOne({username: req.body.username})
            .collation({ locale: "ko", strength: 2 })
            .exec();
            if(teamExists) {
                res.status(409).send("이미 같은 아이디로 등록된 팀이 존재합니다.");
            }
            else {
                try {
                    // encrypt the password
                    const hashedPwd = await bcrypt.hash(req.body.password, 10);
                    // store new user
                    const newTeam = new Team({
                        username: req.body.username, 
                        password: hashedPwd,
                        name: req.body.name,
                    });
                    await newTeam.save();
                    res.status(201).send("팀 등록 성공!");
                } catch(err) {
                    res.status(500).send(`Error: ${err.message}`); // error handling
                }
            }
        }
    })
];

exports.team_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team update put");
});

// exports.team_update_patch = asyncHandler(async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: team update patch");
// });

exports.team_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: team delete");
});