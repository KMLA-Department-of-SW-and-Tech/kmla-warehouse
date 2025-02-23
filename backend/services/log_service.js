const Log = require("../models/logs");
const itemService = require("./item_service");

exports.getAll = async () => {
    try {
        return await Log.find({});
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.getOne = async (id) => {
    try {
        const log = await Log.findById(id);
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
        return await entry.save({session});
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.deleteOne = async (id) => {
    try {
        const log = await Log.findByIdAndDelete(id);
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
        const updatedLog = await Log.findByIdAndUpdate(id, updates).session(session);

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
        
        
        await exports.editOne(id, {status: "closed"});
        
        console.log("yeets");
        
        await itemService.editOne(log.item, {quantity: item.quantity + log.quantity});
        
        await exports.createOne({
            user: log.user,
            item: log.item,
            quantity: log.quantity,
            type: "return",
        }, "closed");
            
        console.log("hey oh");

        return;
    } catch (e) {
        throw e;
    }
}


// try {

// } catch (e) {
//     switch(e.message) {
//         default:
//             throw e;
//     }
// }