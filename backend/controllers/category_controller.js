const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    const categoryList = await Category.find({}, "name")
    .sort({name: 1})
    .exec();
    if(categoryList == null) {
        const err = new Error("Categories not found");
        err.status = 404;
        return next(err);
    }
    res.send(categoryList);
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