const borrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.borrow_history_list = asyncHandler(async (req, res, next) => {
    const borrowHistoryList = await borrowHistory.find({})
    .sort({name: 1})
    .exec();
    if(borrowHistoryList == null) {
        const err = new Error("Borrow history not found");
        err.status = 404;
        return next(err);
    }
    res.send(borrowHistoryList);
});

exports.borrow_history_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history detail");
});

// Will implement search

exports.borrow_history_create = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const newEntry = new borrowHistory({
                item: req.body.item,
                quantity: req.body.quantity,
                borrower: req.body.borrower,
                borrow_date: req.body.borrow_date,
                return_date: req.body.return_date,
            });
            await newEntry.save();
            req.status(201).send("Sucessflly created log entry");
        }
    })
]

exports.borrow_history_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history delete");
});