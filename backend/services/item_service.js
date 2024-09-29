const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const itemRepository = require("../repositories/item_repository");

exports.getItemList = async () => {
    try {
        const itemList = await itemRepository.getAllItems();
        if(itemList == null) {
           throw new Error("Items not found");
        } 
        return itemList;
    } catch (err) {
        if(err.message == "Items not found") {
            throw err;
        }
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
        if(err.message == "Item not Found") {
            throw err;
        }
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
        const createdItem = await itemRepository.saveItem(newItem);
        if(createdItem == null) throw new Error();
        return createdItem;
    } catch (err) {
        throw new Error("Failed to save item to database");
    }
};

exports.updateItem = async (item, id) => {
    try {
        updatedItem = await itemRepository.findByIdAndUpdate(item, id);
        if (updatedItem == null) {
            throw new Error("Item not found");
        }
        return updatedItem;
    } catch (err) {
        if(err.message == "Item not found") {
            throw err;
        }
        throw err;
    }
};

exports.item_borrow = [
    asyncHandler(async (req, res, next) => {
        
    }),
];