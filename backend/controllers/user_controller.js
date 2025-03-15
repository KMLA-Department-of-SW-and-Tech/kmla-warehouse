const userService = require("../services/user_service");
const teamConfig = require("../config/team-config")

module.exports.syncFirebaseAndMongooseUserDB = async (req, res, next) => {
    try {
        const foundUser = await userService.findUserByFirebaseUid(
            req.firebaseUid
        );
        if (!!foundUser) {
            return res.status(200).send("Firebase user already exists");
        }
        return res
            .status(200)
            .send(await userService.createUserByFirebaseUid(req.firebaseUid));
    } catch (e) {
        console.error(
            "Internal server error when syncing firebase and mongoose user" + e
        );
        return res.status(500).send("Internal server error: " + e.message);
    }
};

module.exports.getUserInfo = async (req, res, next) => {
    try {
        const foundUser = await userService.findUserByFirebaseUid(
            req.firebaseUid
        );
        return res.status(200).send(foundUser);
    } catch (e) {
        console.error("Internal server error when getting user info" + e);
        return res.status(500).send("Internal server error: " + e.message);
    }
};

module.exports.updateUserInfo = async (req, res, next) => {
    try {
        // console.log(req.body);
        return res
            .status(200)
            .send(
                await userService.updateUserByFirebaseUid(
                    req.firebaseUid,
                    req.body
                )
            );
    } catch (e) {
        console.error("Internal server error when updating user info" + e);
        return res.status(500).send("Internal server error: " + e.message);
    }
};

module.exports.getUnauthorizedUserList = async (req, res, next) => {
    try {
        return res.status(200).send(await userService.getUnauthorizedUsers());
    } catch (e) {
        console.error(
            "Internal server error when getting unauthorized user list" + e
        );
        return res.status(500).send("Internal server error: " + e.message);
    }
};

module.exports.authorizeUser = async (req, res, next) => {
    try {
        return res
            .status(200)
            .send(await userService.authorizedUserById(req.params.id));
    } catch (e) {
        console.error(
            "Internal server error when getting authorizing user" + e
        );
        return res.status(500).send("Internal server error: " + e.message);
    }
};

module.exports.getAuthorizedUserList = async (req, res, next) => {
    try {
        return res.status(200).send(await userService.getAuthorizedUsers());
    } catch (e) {
        console.error(
            "Internal server error when getting authorized user list" + e
        );
        return res.status(500).send("Internal server error: " + e.message);
    }
};

module.exports.getTeamNameList = async (req, res, next) => {
    try {
        return res.status(200).send([teamConfig.teamNameList.concat(teamConfig.noTeamNameAvailable), teamConfig.noTeamNameAvailable]);
    } catch (e) {
        console.error("Internal server error when getting team name list" + e);
        return res.status(500).send("Internal server error: " + e.message);
    }
};
