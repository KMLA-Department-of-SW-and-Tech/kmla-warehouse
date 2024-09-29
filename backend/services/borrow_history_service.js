const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const borrowHistoryRepository = require("../repositories/borrow_history_repository");

exports.getBorrowHistoryList = async () => {
    try {
        const borrowHistoryList = await borrowHistoryRepository.getAllBoroHistory();
        if(borrowHistoryList == null) {
            throw new Error("Borrow history not found");
        }
        return borrowHistoryList;
    } catch (err) {
        if(err.message == "Borrow history not found") {
            throw err;
        }
        throw new Error("Failed to get item list fron database");
    }
};

exports.borrow_history_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history detail");
});

// Will implement search

exports.createBorrowHistory = async (entry) => {
    const newEntry = new BorrowHistory({
        item: entry.item,
        quantity: entry.quantity,
        user: entry.user,
        timestamp: entry.timestamp,
        type: entry.type,
    });
    try {
        const newBorrowHistory = await borrowHistoryRepository.saveBorrowHistory(newEntry);
        if(newBorrowHistory == null) throw new Error();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to save entry to database");
    }
};

exports.borrow_history_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history delete");
});