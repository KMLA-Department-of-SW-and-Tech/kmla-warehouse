const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const tagRepository = require("../repositories/tag_repository");

exports.getTagList = async () => {
    try {
        const tagList = await tagRepository.getAllTags();
        if(tagList == null) {
            throw new Error("Tags not found");
        }
        return tagList;
    } catch (err) {
        if(err.message == "Tags not found") {
            throw err;
        }
        throw new Error("Failed to get tag list fron database");
    }
};

exports.createTag = async (tag) => {
    try {
        const tagExists = await tagRepository.getTagByName(tag.name);
        if(tagExists) {
            throw new Error("A tag with the same name already exists")
        }
    } catch (err) {
        if(err.message == "A tag with the same name already exists") {
            throw err;
        }
        throw new Error("Failed to get tag data from database");
    }
    const newTag = new Tag({name: tag.name});
    try {
        const createdTag = await tagRepository.saveTag(newTag);
        if(createdTag == null) throw new Error();
        return createdTag;
    } catch (err) {
        throw new Error("Failed to save tag to database");
    }
};

// Will implement search

exports.updateTag = async (tag, id) => {
    try {
        const updatedTag = await tagRepository.findByIdAndUpdate(tag, id);
        if (updatedTag == null) {
            throw new Error("Tag not found");
        }
        return updatedTag;
    } catch (err) {
        if(err.message == "Tag not found") {
            throw err;
        }
        throw err;
    }
}

exports.tag_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: tag delete");
});