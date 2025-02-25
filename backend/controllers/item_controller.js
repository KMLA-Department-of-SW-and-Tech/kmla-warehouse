const itemService = require("../services/item_service");

exports.list = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAvailiable());
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.listAll = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAll());
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.listForTeam = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAvailiableForTeam(req.params.teamName));
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.listAllForTeam = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAllForTeam(req.params.teamName));
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.detail = async (req, res, next) => {
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

exports.create = async (req, res, next) => {
    try {
        return res.status(201).send(await itemService.createOne(req.body));
    } catch (e) {   
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.edit = async (req, res, next) => {
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

exports.delete = async (req, res, next) => {
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

exports.borrow = async (req, res, next) => {
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