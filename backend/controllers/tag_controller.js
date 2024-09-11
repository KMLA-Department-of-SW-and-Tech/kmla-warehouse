const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");

exports.tag_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag list");
});

exports.tag_create = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag create");
});

// Will implement search

exports.tag_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag update put");
});

exports.tag_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag delete");
});