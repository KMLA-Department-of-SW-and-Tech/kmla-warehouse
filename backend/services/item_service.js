const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const itemRepository = require("../repositories/item_repository");

exports.getItemList = async () => {
    try {
        const itemList = await itemRepository.getItemList();
        if(itemList == null) {
           throw new Error("Items not found");
        } 
        return itemList;
    } catch (err) {
        throw new Error("Failed to get item list fron database");
    }
};

exports.getItemDetail = async(itemId) => {
    try {
        const item = await itemRepository.getItemById(itemId);
        if(item == null) {
            throw new Error("Item not Found");
        }
        return item;
    } catch (err) {
        throw new Error("Failed to get item data from database");
    }
};

// Will implement search

exports.createItem = async (item) => {
    try {
        const itemExists = await itemRepository.getItemByName(item.name);
        if(itemExists) {
            throw new Error("An item with the same name already exists");
        }
    } catch (err) {
        if(err.message == "An item with the same name already exists") {
            throw err;
        }
        else {
            throw new Error("Failed to get item data from database");
        }
    }
    const newItem = new Item({
        name: item.name,
        description: item.description,
        totalQuantity: item.quantity,
        availableQuantity: item.quantity,
        location: item.location,
        status: "available",
        tags: [],
        category: null,
    });
    try {
        return await itemRepository.saveItem(newItem);
    } catch (err) {
        throw new Error("Failed to save item to database");
    }
};

exports.updateItem = async (item, id) => {
    try {
        return await itemRepository.findByIdAndUpdate(item, id);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

exports.item_borrow = [
    asyncHandler(async (req, res, next) => {
        
    }),
];