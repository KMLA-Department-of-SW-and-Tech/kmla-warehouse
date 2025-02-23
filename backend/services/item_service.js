const Item = require("../models/item");
const logService = require("./log_service");
const mongoose = require("mongoose");

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

exports.getOne = async (id, session=null) => {
    try {
        const log = await Item.findById(id).session(session);
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

exports.editOne = async (id, updates, session=null) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, updates).session(session);

        if (!updatedItem) {
            throw new Error("Item not found");
        }

        return;
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.deleteOne = async (id) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, {status: "deleted"});

        if (!updatedItem) {
            throw new Error("Item not found");
        }

        return;
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.borrow = async (id, body) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        const {quantity, user} = body;

        console.log(quantity, user);

        const prevItemState = await exports.getOne(id);

        if(!prevItemState) {
            throw new Error("Item not found");
        }

        if(quantity > prevItemState.quantity) {
            throw new Error("Invalid quantity");
        }

        await exports.editOne(id, {quantity: prevItemState.quantity - quantity});

        await logService.createOne({
            user,
            item: id,
            quantity,
            type: "borrow",
        });

        // await session.commitTransaction();
        // session.endSession();

        return;
    } catch (e) {
        // await session.abortTransaction();
        // session.endSession();
        throw e;
    }
}