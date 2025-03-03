const Item = require("../models/item");
const logService = require("./log_service");
const userService = require("./user_service");
// const mongoose = require("mongoose");

module.exports.getAvailable = async () => {
    try {
        return await Item.find({ status: 'valid' });
    } catch (e) {
        throw(e);
    }
}

module.exports.getAll = async () => {
    try {
        return await Item.find({});
    } catch (e) {
        throw(e);
    }
}

module.exports.getAvailableForTeam = async (firebaseUid) => {
    try {
        const userData = await userService.findUserByFirebaseUid(firebaseUid);
        console.log("<" + userData + ">");
        const teamName = userData.teamName;
        const teamLogs = (await logService.getAllForTeam(teamName)).filter(log => log.item.status === "valid");
        // return teamLogs.map(log => log.item);
        return teamLogs;
    } catch (e) {
        throw(e);
    }
}

module.exports.getAllForTeam = async (teamName) => {
    try {
        const teamLogs = logService.getAllForTeam(teamName);
        return teamLogs.map(log => log.item);
    } catch (e) {
        throw(e);
    }
}

module.exports.getOne = async (id, session=null) => {
    try {
        const log = await Item.findById(id).session(session);
        if(!log) {
            throw new Error("Item not found");
        } 
        return log;
    } catch (e) {
        throw(e);
    }
}

module.exports.createOne = async (body) => {
    const args = Object.assign(body, {
        totalQuantity: body.quantity,
        status: "valid",
    });
    const entry = new Item(args);

    try {
        const newItem = await entry.save();
        
        if(!newItem) {
            throw new Error("Item not created");
        }

        return newItem;s
    } catch (e) {
        throw(e);
    }
}

module.exports.editOne = async (id, updates, session=null) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, updates).session(session);

        if (!updatedItem) {
            throw new Error("Item not found");
        }

        return updatedItem;
    } catch (e) {
        throw(e);
    }
}

module.exports.deleteOne = async (id) => {
    try {
        const deletedItem = await Item.findByIdAndUpdate(id, { status: "deleted" });

        if (!deletedItem) {
            throw new Error("Item not found");
        }

        return deletedItem;
    } catch (e) {
        throw e;
    }
}

module.exports.borrow = async (id, body, firebaseUid) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        console.log(body);
        const { quantity } = body;
        const user = await userService.findUserByFirebaseUid(firebaseUid);
        const teamName = user.teamName;
        console.log("hi", quantity, teamName);

        const prevItemState = await module.exports.getOne(id);
        console.log(prevItemState);

        if(!prevItemState) {
            throw new Error("Item not found");
        }

        if(quantity > prevItemState.quantity) {
            throw new Error("Invalid quantity");
        }

        const updatedItem = await module.exports.editOne(id, { quantity: prevItemState.quantity - quantity });

        await logService.createOne({
            teamName,
            item: id,
            quantity,
            type: "borrow",
        });

        // await session.commitTransaction();
        // session.endSession();

        return updatedItem;
    } catch (e) {
        // await session.abortTransaction();
        // session.endSession();
        throw e;
    }
}