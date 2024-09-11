const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item list");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item detail");
});

// Will implement search

exports.item_create = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item create");
});

exports.item_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update put");
});

exports.item_update_patch = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update patch");
});

exports.item_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete");
});