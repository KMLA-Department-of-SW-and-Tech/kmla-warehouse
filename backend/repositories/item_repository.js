const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllItems = async () => {
    const itemList = await Item.find({})
    .populate('tags')
    .sort({name: 1})
    .exec();
    return itemList;
};

exports.searchItems = async (query) => {
    const queryStrings = query.split(' ');
    allQueries = [];
    queryStrings.forEach(word => {
        allQueries.push({
            $or: [
                {name: {$regex: String(word)}},
                {description: {$regex: String(word)}},
            ],
        })
    });
    console.log(allQueries);
    const itemList = await Item.find({
        $or: allQueries,
    })
    .populate('tags')
    .sort({name: 1})
    .exec();
    return itemList;
};

exports.getItemById = async (itemId) => {
    const item = await Item.findById(itemId)
    .populate('tags')
    .exec();
    return item;
};

exports.getItemByIdWithoutPopulate = async (itemId) => {
    const item = await Item.findById(itemId)
    .exec();
    return item;
};

// Will implement search

exports.getItemByName = async (name) => {
    const item = await Item.findOne({name: name})
    .collation({ locale: "ko", strength: 2 })
    .exec();
    return item;
}

exports.saveItem = async (item) => {
    const newItem = await item.save();
    return newItem;
};

exports.findByIdAndUpdate = async (item, id) => {
    item._id = id;
    return await Item.findByIdAndUpdate(id, item, {});
};

exports.item_update_patch = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update patch");
});

exports.item_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete");
});

exports.item_borrow = [
    asyncHandler(async (req, res, next) => {
        
    }),
];