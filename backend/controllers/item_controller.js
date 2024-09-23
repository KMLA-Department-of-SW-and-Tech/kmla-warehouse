const Item = require("../models/item");
const BorrowHistory = require("../models/borrow_history");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    const itemHistory = await BorrowHistory.find({item: req.params.id})
    res.json({item});
});

// Will implement search

exports.item_create = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const itemExists = await Item.findOne({name: req.body.name})
            .collation({ locale: "ko", strength: 2 })
            .exec();
            if(itemExists) {
                res.status(409).send("이미 같은 이름의 물품이 등록되어 있습니다.");
            }
            else {
                const newItem = new Item({
                    name: req.body.name,
                    description: req.body.description,
                    total_quantity: req.body.quantity,
                    available_quantity: req.body.quantity,
                    location: req.body.location,
                    status: "대여가능",
                    tags: [],
                    category: null,
                });
                await newItem.save();
                res.status(201).send("물품 등록 성공!")
            }
        }
    }),
]

exports.item_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update put");
});

exports.item_update_patch = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update patch");
});

exports.item_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete");
});