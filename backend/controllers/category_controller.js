const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
    const categoryList = await Category.find({}, "name")
    .sort({name: 1})
    .exec();
    if(categoryList == null) {
        const err = new Error("Categories not found");
        err.status = 404;
        return next(err);
    }
    res.send(categoryList);
});

exports.category_create = [
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const categoryExists = await Category.findOne({name: req.body.name})
            .collation({locale: "ko", strength: 2})
            .exec();
            if(categoryExists) {
                res.status(409).send("이미 등록된 분류입니다.");
            }
            else {
                const newCategory = new Category({name: req.body.name});
                await newCategory.save();
                res.status(201).send("분류 등록 성공!");
            }
        }
    })
];

// Will implement search

exports.category_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category update put");
});

exports.category_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: category delete");
});