const itemService = require("../services/item_service");

module.exports.list = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAvailable());
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

module.exports.listAll = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAll());
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

module.exports.listForTeam = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAvailableForTeam(req.params.teamName));
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

module.exports.listAllForTeam = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAllForTeam(req.params.teamName));
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

module.exports.detail = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await itemService.getOne(id));
    } catch (e) {
        switch(e.message) {
            case "Item not found":
                return res.status(404).send(e);
            default:
                return res.send(e);
        }
    }
};

module.exports.create = async (req, res, next) => {
    try {
        return res.status(201).send(await itemService.createOne(req.body));
    } catch (e) {   
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await itemService.editOne(id, req.body));
    } catch (e) {   
        switch(e.message) {
            case "Item not found":
                return res.status(404).send(e);
            default:
                return res.send(e);
        }
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await itemService.deleteOne(id));
    } catch (e) {   
        switch(e.message) {
            case "Item not found":
                return res.status(404).send(e);
            default:
                return res.send(e);
        }
    }
};

module.exports.borrow = async (req, res, next) => {
    try {
        return res.status(201).send(await itemService.borrow(req.params.id, req.body));
    } catch (e) {   
        switch(e.message) {
            case "Item not found":
                return res.status(404).send(e);
            case "Invalid quantity":
                return res.status(401).send(e);
            default:
                return res.send(e);
        }
    }
};