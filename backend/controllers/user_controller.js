module.exports.testApi = async (req, res, next) => {
    return res.status(200).send("success");
}

module.exports.getUserInfo = async (req, res, next) => {
    return res.status(200).send("not implemented");
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