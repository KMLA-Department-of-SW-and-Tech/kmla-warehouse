const BorrowHistory = require("../models/logs.js");

const logService = require("../services/log_service.js");

exports.log_list = async (req, res, next) => {
    try {
        return res.status(200).send(await logService.getAll());
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.log_detail = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await logService.getOne(id));
    } catch (e) {
        switch(e.message) {
            case "Log not found":
                return res.status(404).send(e);
            default:
                return res.send(e);
        }
    }
};

exports.log_create = async (req, res, next) => {
    try {
        return res.status(201).send(await logService.createOne(req.body));
    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

exports.log_delete = async (req, res, next) => {
    try {
        const id  = req.params.id;

        return res.status(200).send(await logService.deleteOne(id));
    } catch (e) {
        switch(e.message) {
            case "Log not found":
                return res.status(404).send(e);
            default:
                return res.send(e);
        }
    }
};

exports.item_return = async (req, res, next) => {
    try {

    } catch (e) {
        switch(e.message) {
            default:
                return res.send(e);
        }
    }
};

