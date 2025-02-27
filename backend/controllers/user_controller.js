

module.exports.testApi = async (req, res, next) => {
    return res.status(200).send("success");
}