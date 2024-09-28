
const Team = require("../models/team");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const teamRepository = require("../repositories/team_repository");

// next error handling과 res.send() error handling이 같이 쓰이는데 이거 기준이 뭔가요?

exports.getTeamList = async () => {
    try {
        const teamList = await teamRepository.getAllTeams();

        if(teamList == null) {
            throw new Error("Teams not found");
        }

        return teamList;
    } catch (err) {
        throw new Error("Failed to get team list from database");
    }
}; // only for admin

exports.getTeamDetail = async (teamId) => {
    try {
        const team = await teamRepository.getTeamById(teamId);
        if(team == null) {
            throw new Error("Team not found");
        }
        return team;
    } catch (err) {
        throw new Error("Failed to get team data from database");
    }
};

// Will implement search

exports.createTeam = async (username, password, name) => {
    try {
        const teamExists = await teamRepository.findTeamByName(username);
        if(teamExists) {
            throw new Error("A Team with the same username already exists");
        }
    } catch (err) {
        throw new Error("Failed to get team data from database");
    }
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // store new user
    const newTeam = new Team({
        username: username, 
        password: hashedPwd,
        name: name,
    });
    return await teamRepository.saveTeam(newTeam);
} 

exports.updateTeam = async (team, id) => {
    console.log(team);
    try {
        return await teamRepository.findByIdAndUpdate(team, id);
    } catch (err) {
        throw new Error(err);
    }
};