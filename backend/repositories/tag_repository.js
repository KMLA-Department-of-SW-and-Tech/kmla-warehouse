const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllTags = async () => {
    const tagList = await Tag.find({}, "name")
    .sort({name: 1})
    .exec();
    return tagList;
};

exports.getTagByName = async (name) => {
    const tag = await Tag.findOne({name: name})
    .collation({ locale: "ko", strength: 2 })
    .exec();
    return tag;
};

exports.saveTag = async (tag) => {
    const newTag = await tag.save();
    return newTag;
};

// Will implement search

exports.findByIdAndUpdate = async (tag, id) => {
    tag._id = id;
    return await Tag.findByIdAndUpdate(id, tag, {});
}

exports.tag_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag delete");
});