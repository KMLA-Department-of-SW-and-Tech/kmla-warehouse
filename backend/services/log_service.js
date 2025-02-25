const Log = require("../models/logs");
const itemService = require("./item_service");

exports.getAll = async () => {
    try {
        return await Log.find({}).populate("item");
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.getAllForTeam = async (teamName) => {
    try {
        return await Log.find({user: teamName}).populate("item");
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.getOne = async (id) => {
    try {
        const log = await Log.findById(id).populate("item");
        if(!log) {
            throw new Error("Log not found");
        } 
        return log;
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.createOne = async (body, status=null, session=null) => {
    const args = { ...body, timestamp: Date.now(), status: status ? status : "active" };
    const entry = new Log(args);

    try {
        return (await entry.save({session})).populate("item");
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.deleteOne = async (id) => {
    try {
        const log = await Log.findByIdAndDelete(id).populate("item");
        if(!log) {
            throw new Error("Log not found");
        }

        return;
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.editOne = async (id, updates, session=null) => {
    try {
        const updatedLog = await Log.findByIdAndUpdate(id, updates).populate("item").session(session);

        if (!updatedLog) {
            throw new Error("Log not found");
        }

        return;
    } catch (e) {
        throw e;
    }
}

exports.return = async (id) => {
    try {
        const log = await exports.getOne(id);
        if(!log) {
            throw new Error("Log not found");
        }
        
        const item = await itemService.getOne(log.item);
        if(!item) {
            throw new Error("Item not found");
        }
        
        
        const updatedItem = await exports.editOne(id, {status: "closed"});
        
        console.log("yeets");
        
        await itemService.editOne(log.item, {quantity: item.quantity + log.quantity});
        
        await exports.createOne({
            user: log.user,
            item: log.item,
            quantity: log.quantity,
            type: "return",
        }, "closed");

        return updatedItem;
    } catch (e) {
        throw e;
    }
}