const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.tag_list = asyncHandler(async (req, res, next) => {
    const tagList = await Tag.find({}, "name")
    .sort({name: 1})
    .exec();
    if(tagList == null) {
        const err = new Error("Tags not found");
        err.status = 404;
        return next(err);
    }
    res.send(tagList);
});

exports.tag_create = [
    body("name", "Tag name must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const newTag = new Tag({name: req.body.name});
        
        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            const tagExists = await Tag.findOne({name: req.body.name})
            .collation({ locale: "en", strength: 2 })
            .exec();
            if(tagExists) {
                res.status(409).send("이미 등록된 태그입니다.");
            }
            else {
                await newTag.save();
                res.status(201).send("태그 등록 성공!");
            }
        }
    }),
];

// Will implement search

exports.tag_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag update put");
});

exports.tag_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag delete");
});