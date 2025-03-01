const userService = require("../services/user_service");
const teamNameList = require("../config/team-config").teamNameList;

module.exports.syncFirebaseAndMongooseUserDB = async (req, res, next) => {
    try {
        const foundUser = await userService.findUserByFirebaseUid(req.firebaseUid);
        if(!!foundUser) {
            return res.status(200).send("Firebase user already exists");
        }
        return res.status(200).send(await userService.createUserByFirebaseUid(req.firebaseUid));
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}

module.exports.getUserInfo = async (req, res, next) => {
    try {
        const foundUser = await userService.findUserByFirebaseUid(req.firebaseUid);
        return res.status(200).send(foundUser);
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}

module.exports.updateUserInfo = async (req, res, next) => {
    try {
        return res.status(200).send(await userService.updateUserByFirebaseUid(req.firebaseUid, req.body));
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}

module.exports.getUnauthorizedUserList = async (req, res, next) => {
    try {
        return res.status(200).send(await userService.getUnauthorizedUsers());
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}

module.exports.authorizeUser = async (req, res, next) => {
    try {
        return res.status(200).send(await userService.authorizedUserById(req.params.id));
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}

module.exports.getAuthorizedUserList = async (req, res, next) => {
    try {
        return res.status(200).send(await userService.getAuthorizedUsers());
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}

module.exports.getTeamNameList = async (req, res, next) => {
    try {
        return res.status(200).send(teamNameList);
    } catch(e) {
        return res.status(500).send("Internal server error: " + e.message);
    }
}