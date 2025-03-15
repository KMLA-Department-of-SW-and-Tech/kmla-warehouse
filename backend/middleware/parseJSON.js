const parseJSON = async (req, res, next) => {
    return JSON.parse(req.body);
}

module.exports = parseJSON;