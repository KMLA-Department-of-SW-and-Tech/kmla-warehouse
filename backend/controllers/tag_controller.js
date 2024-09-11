const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");

exports.tag_list = asyncHandler(async (req, res, next) => {
    const tagList = await Tag.find({}, "name")
    .sort({name: 1})
    .exec();
    if(tagList == null) {
        const err = new Error("Tags not found");
        err.status = 404;
        return next(err);
    }
    res.send(tagList);
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