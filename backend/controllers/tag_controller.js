const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const tagService = require("../services/tag_service");

exports.tag_list = asyncHandler(async (req, res, next) => {
    try {
        const tagList = await tagService.getTagList();
        res.status(200).send(tagList);
        return;
    } catch (err) {
        if(err.message == "Tags not found") {
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

exports.tag_create = [
    body("name", "Tag name must not be empty")
    .trim()
    .isLength({min:1})
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
            return;
        }
        else {
            try {
                const tag = await tagService.createTag(req.body);
                res.status(201).send("Successfully created tag");
                return;
            } catch (err) {
                if(err.message == "A tag with the same name already exists") {
                    res.status(409).send(err);
                    return;
                }
                if(err.message == "Failed to get tag data from database") {
                    res.status(404).send(err);
                    return;
                }
                if(err.message == "Failed to save tag to database") {
                    res.status(500).send(err);
                    return;
                }
                res.status(500).send("Internal Server Error");
                return;
            }
        }
    }),
];

// Will implement search

exports.tag_update_put = [
    asyncHandler(async (req, res, next) => {
        errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.send(errors.array());
        }
        else {
            try {
                const updatedTag = await tagService.updateTag(req.body, req.params.id);
                res.status(200).send("Successfuly updated tag");
                return;
            } catch (err) {
                if(err.message == "Tag not found") {
                    res.status(404).send(err);
                    return;
                }
                console.log(err);
                res.status(500).send(err);
                return;
            }
        }
    }),
];

exports.tag_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag delete");
});