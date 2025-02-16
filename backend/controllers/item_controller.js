const itemService = require("../services/item_service");

exports.list = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAll());
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