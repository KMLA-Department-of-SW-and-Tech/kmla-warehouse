const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const itemService = require("../services/item_service");

exports.item_list = asyncHandler(async (req, res, next) => {
    try {
        const itemList = await itemService.getItemList();
        res.status(200).send(itemList);
        return;
    } catch (err) {
        if(err.message == "Items not found") {
            res.status(404).send(err);
            return;
        }
        if(err.message == "Failed to get item list fron database") {
            res.status(404).send(err);
            return;
        }
        res.status(500).send({error: "Internal Server Error"});
        return;
    }
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    try {
        const item = await itemService.getItemDetail(req.params.id);
        // const lastItemHistory = await BorrowHistory.find({item: req.params.id, return_date: null}).exec();
        // item._doc.current_borrower =  (lastItemHistory.length == 0 ? null : lastItemHistory[0].borrower); // find borrower faulty
        res.json({item});
        return;
    } catch (err) {
        if(err.message == "Item not Found") {
            res.status(404).send(err);
            return;
        }
        if (err.message == "Failed to get item data from database") {
            res.status(404).send(err);
            return;
        }
        res.status(500).send({error: "Internal Server Error"});
        return;
    }
});

// Will implement search

exports.item_create = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
            return;
        }
        else {
            try {
                const item = await itemService.createItem(req.body);
                res.status(201).send("Successfully created item");
                return;
            } catch (err) {
                if(err.message == "An item with the same name already exists") {
                    res.status(409).send(err);
                    return;
                }
                if(err.message == "Failed to get item data from database") {
                    res.status(404).send(err);
                    return;
                }
                if(err.message == "Failed to save item to database") {
                    res.status(500).send(err);
                    return;
                }
                res.status(500).send({error: "Internal Server Error"});
                return;
            }
        }
    }),
]

exports.item_update_put = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
            return;
        }
        else {
            const id = req.params.id;
            try {
                const updatedItem = await itemService.updateItem(req.body, id);
                res.status(200).send("Successfully updated item");
                return;
            } catch (err) {
                if(err.message == "Item not found") {
                    res.status(404).send(err);
                    return;
                }
                res.status(500).send(err);
                return;
            }
        }
    }),
];

exports.item_update_patch = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update patch");
});

exports.item_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete");
});

exports.item_borrow = [
    asyncHandler(async (req, res, next) => {
        try {
            itemService.borrowItem(req.params.id, req.body.quantity, req.username);
        } catch (err) {
            if (err.message == "Failed to get user data from database") {
                res.status(404).send(err);
            }
            if (err.message == "Item not Found") {
                res.status(404).send(err);
            }
            if (err.message == "Failed to get item data from database") {
                res.status(404).send(err);
            }
            if (err.message == "Failed to save entry to database") {
                res.status(500).send(err);
            }
            if (err.message == "Not a valid borrow request: items unavailable") {
                res.status(400).send(err);
            }
            res.status(500).send(err);
        }
    }),
];

exports.item_return = [
    asyncHandler(async (req, res, next) => {
        try {
            itemService.returnItem(req.params.id, req.body.quantity, req.username);
        } catch (err) {
            if (err.message == "Failed to get user data from database") {
                res.status(404).send(err);
            }
            if (err.message == "Item not Found") {
                res.status(404).send(err);
            }
            if (err.message == "Failed to get item data from database") {
                res.status(404).send(err);
            }
            if (err.message == "Failed to save entry to database") {
                res.status(500).send(err);
            }
            if (err.message == "Not a valid borrow request: items unavailable") {
                res.status(400).send(err);
            }
            res.status(500).send(err);
        }
    }),
];