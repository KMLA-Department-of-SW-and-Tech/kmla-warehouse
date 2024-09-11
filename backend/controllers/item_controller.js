const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
    const itemList = await Item.find({}, "name status")
    .sort({name: 1})
    .exec();
    if(itemList == null) {
        const err = new Error("Items not found");
        err.status = 404;
        return next(err);
    }
    res.send(itemList);
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();
    if(item == null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }
    res.json({item});
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