const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const borrowHistoryRepository = require("../repositories/borrow_history_repository");
const teamRepository = require("../repositories/team_repository");
const itemRepository = require("../repositories/item_repository");

const itemService = require("../services/item_service");

exports.getBorrowHistoryList = async () => {
    try {
        const borrowHistoryList = await borrowHistoryRepository.getAllBorrowHistory();
        if(borrowHistoryList == null) {
            throw new Error("Borrow history not found");
        }
        return borrowHistoryList;
    } catch (err) {
        if(err.message == "Borrow history not found") {
            throw err;
        }
        throw new Error("Failed to get item list fron database");
    }
};

exports.getBorrowHistoryDetail = async (logId) => {
    try {
        const log = await borrowHistoryRepository.getHistoryById(logId);
        if(log == null) {
            throw new Error("Borrow history not Found");
        }
        console.log(log);
        return log;
    } catch (err) {
        if(err.message == "Borrow history not Found") {
            throw err;
        }
        // throw new Error("Failed to get borrow history data from database");
        throw err;
    }
};

// Will implement search

exports.createBorrowHistory = async (entry) => {
    const newEntry = new BorrowHistory({
        item: entry.item,
        quantity: entry.quantity,
        user: entry.user,
        timestamp: entry.timestamp,
        type: entry.type,
        reference: entry.reference,
    });
    try {
        const newBorrowHistory = await borrowHistoryRepository.saveBorrowHistory(newEntry);
        if(newBorrowHistory == null) throw new Error();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to save entry to database");
    }
};

exports.borrow_history_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: borrow_history delete");
});

exports.returnItem = async (logId, username) => {
    // get log data
    let logData = null;
    try {
        logData = await exports.getBorrowHistoryDetail(logId);
        if(logData == null) {
            throw new Error("Failed to get borrow History data from database");
        }
    } catch (err) {
        if(err.message == "Failed to get borrow History data from database") {
            throw err;
        }
        throw err;
    }

    const itemId = logData.item._id;
    const quantity = logData.quantity;

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
        item = await itemService.getItemDetail(itemId);
    } catch(err) {
        throw err;
    }

    // update item quantity data
    item.availableQuantity += quantity;
    try {
        await itemService.updateItem(item, itemId);
    } catch (err) {
        throw err;
    }

    // enter log
    const newEntry = {
        item: itemId,
        quantity: quantity,
        user: user._id,
        type: "return",
        reference: logId,
    }
    try {
        await exports.createBorrowHistory(newEntry);
    } catch (err) {
        throw err;
    }
};

exports.getBorrowList = async (userId) => {
    try {
        const borrowHistoryList = await borrowHistoryRepository.getUserBorrowHistory(userId);
        if(borrowHistoryList == null) {
            throw new Error("Borrow history not found");
        }
        const ret = [];
        for (borrow_log of borrowHistoryList) {
            if(borrow_log.type != "borrow") continue;
            let isReturned = false;
            for(return_log of borrowHistoryList) {
                if(return_log.type != "return") continue;
                console.log(return_log.reference, borrow_log._id, return_log.reference.equals(borrow_log._id))
                if(return_log.reference.equals(borrow_log._id)) {
                    isReturned = true;
                    break;
                }
            }
            if(!isReturned) {
                ret.push(borrow_log);
            }
        }
        return ret;
    } catch (err) {
        if(err.message == "Borrow history not found") {
            throw err;
        }
        throw new Error("Failed to get borrow list from database");
    }
}