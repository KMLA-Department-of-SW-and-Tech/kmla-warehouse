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
    // const lastItemHistory = await BorrowHistory.find({item: req.params.id, return_date: null}).exec();
    // item._doc.current_borrower =  (lastItemHistory.length == 0 ? null : lastItemHistory[0].borrower); // find borrower faulty
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
                    totalQuantity: req.body.quantity,
                    availableQuantity: req.body.quantity,
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

exports.item_update_put = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const item = new Item({
                name: req.body.name,
                description: req.body.description,
                tags: req.body.tags,
                totalQuantity: req.body.totalQuantity,
                availableQuantity: req.body.availableQuantity,
                location: req.body.location,
                // photo will be added later
                category: req.body.category,
                status: req.body.status,
                _id: req.params.id,
            });
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
            res.status(200).send("Successfully updated item");

        }
    }),
];

exports.item_update_patch = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update patch");
});

exports.item_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete");
});