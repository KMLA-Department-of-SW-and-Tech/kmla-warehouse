const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category list");
});

exports.category_create = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category create");
});

// Will implement search

exports.category_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update put");
});

exports.category_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category delete");
});