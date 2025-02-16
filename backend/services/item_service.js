const Item = require("../models/item");

exports.getAll = async () => {
    try {
        return await Item.find({});
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.getOne = async (id) => {
    try {
        const log = await Item.findById(id);
        if(!log) {
            throw new Error("Item not found");
        } 
        return log;
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.createOne = async (body) => {
    console.log(body);
    const args = Object.assign(body, {
        totalQuantity: body.quantity,
        status: "valid",
    });
    const entry = new Item(args);

    try {
        return await entry.save();
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}