const logService = require("../services/log_service");

module.exports.list = async (req, res, next) => {
    try {
        return res.status(200).send(await logService.getAll());
    } catch (e) {
        switch (e.message) {
            default:
                console.error("Internal server error when listing logs" + e);
                return res
                    .status(500)
                    .send("Internal server error: " + e.message);
        }
    }
};

module.exports.listForTeam = async (req, res, next) => {
    try {
        return res
            .status(200)
            .send(await logService.getAllForTeam(req.params.teamName));
    } catch (e) {
        switch (e.message) {
            default:
                console.error(
                    "Internal server error when listing logs for team" + e
                );
                return res
                    .status(500)
                    .send("Internal server error: " + e.message);
        }
    }
};

module.exports.detail = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await logService.getOne(id));
    } catch (e) {
        switch (e.message) {
            case "Log not found":
                console.error("Log not found when getting log detial" + e);
                return res.status(404).send(e.message);
            default:
                console.error(
                    "Internal server error when getting log detial" + e
                );
                return res
                    .status(500)
                    .send("Internal server error: " + e.message);
        }
    }
};

module.exports.create = async (req, res, next) => {
    try {
        return res.status(201).send(await logService.createOne(req.body));
    } catch (e) {
        switch (e.message) {
            default:
                console.error("Internal server error when creating log" + e);
                return res
                    .status(500)
                    .send("Internal server error: " + e.message);
        }
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await logService.deleteOne(id));
    } catch (e) {
        switch (e.message) {
            case "Log not found":
                console.error("Log not found when getting deleting log" + e);
                return res.status(404).send(e.message);
            default:
                console.error("Internal server error when deleting log" + e);
                return res
                    .status(500)
                    .send("Internal server error: " + e.message);
        }
    }
};

module.exports.item_return = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(201).send(await logService.return(id));
    } catch (e) {
        switch (e.message) {
            case "Item not found":
            case "Log not found":
                console.error(
                    "Item or Log not found when getting returning item" + e
                );
                return res.status(404).send(e.message);
            default:
                console.error("Internal server error when returning item" + e);
                return res
                    .status(500)
                    .send("Internal server error: " + e.message);
        }
    }
};
