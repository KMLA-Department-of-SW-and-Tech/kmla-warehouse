const userService = require("../services/user_service");

module.exports.syncFirebaseAndMongooseUserDB = async (req, res, next) => {
    try {
        const foundUser = await userService.findUserByFirebaseUid(req.firebaseUid);
        if(!!foundUser) {
            return res.status(200).send("Firebase user already exists");
        }
        return res.status(200).send(await userService.createUserByFirebaseUid(req.firebaseUid));
    } catch(e) {
        return res.status(500).send("Internal server error");
    }
}

module.exports.getUserInfo = async (req, res, next) => {
    const foundUser = await userService.findUserByFirebaseUid(req.firebaseUid);
}

module.exports.updateUserInfo = async (req, res, next) => {
    return res.status(200).send("not implemented");
}

module.exports.getUnauthorizedUserList = async (req, res, next) => {
    return res.status(200).send("not implemented");
}

module.exports.authorizeUser = async (req, res, next) => {
    return res.status(200).send("not implemented");
}

module.exports.getAuthorizedUserList = async (req, res, next) => {
    return res.status(200).send("not implemented");
}