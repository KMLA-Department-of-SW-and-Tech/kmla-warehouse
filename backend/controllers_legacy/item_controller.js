const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const { body, validationResult } = require("express-validator");

const itemService = require("../services_legacy/item_service");

exports.item_list = async (req, res, next) => {
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
};

exports.item_search = async (req, res, next) => {
    // const itemList = await itemService.searchItemList("hi");
    const itemList = await itemService.searchItemList(req.params.query);
    res.status(200).send(itemList);
    try {
        // return;
    } catch (err) {
        if(err.message == "Items not found") {
            res.status(404).send(err);
            return;
        }
        if(err.message == "Failed to get item list fron database") {
            res.status(404).send(err);
            return;
        }
        // res.status(500).send({error: "Internal Server Error"});
        res.status(500).send(err);
        return;
    }
};

exports.item_detail = async (req, res, next) => {
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
};

// Will implement search

exports.item_create = [
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
            return;
        }
        else {
            try {
                const imageUrl = req.file ? req.file.location : null;
                const imageKey = req.file ? req.file.key : null;
                const newItem = req.body;
                newItem.imageUrl = imageUrl;
                newItem.imageKey = imageKey
                const item = await itemService.createItem(newItem);
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
    },
]

exports.item_update_put = [
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
            return;
        }
        else {
            const id = req.params.id;
            try {
                const currentItem = await itemService.getItemDetail(id);
                const prevKey = currentItem.imageKey;
                const newItem = {
                    name: req.body.name,
                    description: req.body.description,
                    totalQuantity: req.body.quantity,
                    availableQuantity: currentItem.availableQuantity,
                    location: req.body.location,
                    status: req.body.status ? req.body.status : currentItem.status,
                    imageUrl: req.body.imageUrl ? req.body.imageUrl : (req.file ? req.file.location : null),
                    imageKey: req.body.imageKey ? req.body.imageKey: (req.file ? req.file.key : null),
                    _id: id,
                }
                // console.log(id, currentItem, newItem);
                const updatedItem = await itemService.updateItem(newItem, id);
                req.body.prevKey = prevKey;
                return req.body.status ? res.status(200).send("sucessfully deleted") : next();
            } catch (err) {
                if(err.message == "Item not found") {
                    res.status(404).send(err);
                    return;
                }
                res.status(500).send(err);
                return;
            }
        }
    },
];

exports.item_update_patch = async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update patch");
};

exports.item_delete = async (req, res, next) => {
    
};

exports.item_borrow = [
    async (req, res, next) => {
        try {
            await itemService.borrowItem(req.params.id, req.body.quantity, req.username);
            res.status(200).send("Sucessfully borrowed item");
            return;
        } catch (err) {
            if (err.message == "Failed to get user data from database") {
                res.status(404).send(err);
                return;
            }
            if (err.message == "Item not Found") {
                res.status(404).send(err);
                return;
            }
            if (err.message == "Failed to get item data from database") {
                res.status(404).send(err);
                return;
            }
            if (err.message == "Failed to save entry to database") {
                res.status(500).send(err);
                return;
            }
            if (err.message == "Not a valid borrow request: items unavailable") {
                res.status(400).send(err);
                return;
            }
            res.status(500).send(err);
        }
    },
];