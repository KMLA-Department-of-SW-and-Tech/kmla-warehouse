const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllBoroHistory = async () => {
    const borrowHistoryList = await BorrowHistory.find({})
    .populate('item')
    .populate('user')
    .sort({name: 1})
    .exec();
    return borrowHistoryList;
};

exports.getHistoryById = async (logId) => {
    const borrowHistory = await BorrowHistory.findById(logId)
    .populate('item')
    .populate('user')
    .exec();
    return borrowHistory;
};

// Will implement search

exports.saveBorrowHistory = async (entry) => {
    const newEntry = await entry.save();
    return newEntry;
}

exports.borrow_history_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history delete");
});