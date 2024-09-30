const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const itemRepository = require("../repositories/item_repository");
const teamRepository = require("../repositories/team_repository");

const borrowHistoryService = require("../services/borrow_history_service");

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

const getItemDetail = async(itemId) => {
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

exports.getItemDetail = getItemDetail;

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

const updateItem = async (item, id) => {
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

exports.updateItem = updateItem;

exports.borrowItem = async (itemId, quantity, username) => {
    // get user
    let user = null;
    try {
        user = await teamRepository.findTeamByName(username);
        if(user == null) {
            throw new Error("Failed to get user data from database");
        }
    } catch (err) {
        if(err.message == "Failed to get user data from database") {
            throw err;
        }
        throw err;
    }
    // get item
    let item = null;
    try {
        item = await getItemDetail(itemId);
    } catch(err) {
        throw err;
    }

    // check if borrow request is valid
    if(item.availableQuantity - quantity < 0) {
        throw new Error("Not a valid borrow request: items unavailable");
    }

    // update item quantity data
    item.availableQuantity -= quantity;
    try {
        await updateItem(item, itemId);
    } catch (err) {
        throw err;
    }

    // enter log
    const newEntry = {
        item: itemId,
        quantity: quantity,
        user: user._id,
        type: "borrow",
    }
    try {
        borrowHistoryService.createBorrowHistory(newEntry);
    } catch (err) {
        throw err;
    }
};