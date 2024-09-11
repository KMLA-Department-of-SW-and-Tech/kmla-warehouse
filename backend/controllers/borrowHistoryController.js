const borrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");

exports.borrow_history_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history list");
});

exports.borrow_history_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history detail");
});

// Will implement search

exports.borrow_history_create = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history create");
});

exports.borrow_history_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history delete");
});