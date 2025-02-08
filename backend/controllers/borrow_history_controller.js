const BorrowHistory = require("../models/borrow_history.js");

const borrowHistoryService = require("../services/borrow_history_service.js");

exports.borrow_history_list = async (req, res, next) => {
    try {
        res.status(200).send(await borrowHistoryService.getAll());

        return;
    } catch (e) {
        switch(e.message) {
            default:
                res.send(e);
        }
    }
};

exports.borrow_history_detail = async (req, res, next) => {
    try {
        const id = req.params.id;

        res.status(200).send(await borrowHistoryService.getOne(id));

        return;
    } catch (e) {
        switch(e.message) {
            default:
                res.send(e);
        }
    }
};

exports.borrow_history_create = async (req, res, next) => {
    try {
        res.status(201).send(await borrowHistoryService.createOne(req.body));

        return;
    } catch (e) {
        switch(e.message) {
            default:
                res.send(e);
        }
    }
};

exports.item_return = async (req, res, next) => {
    try {

    } catch (e) {
        switch(e.message) {
            default:
                res.send(e);
        }
    }
};

exports.borrow_history_delete = async (req, res, next) => {
    try {

    } catch (e) {
        switch(e.message) {
            default:
                res.send(e);
        }
    }
};