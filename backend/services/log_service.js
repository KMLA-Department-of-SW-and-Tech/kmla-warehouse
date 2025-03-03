const Log = require("../models/logs");
const itemService = require("./item_service");

module.exports.getAll = async () => {
    try {
        return await Log.find({}).populate("item");
    } catch (e) {
        console.error("Logservice get all logs error" + e);
        throw e;
    }
};

module.exports.getAllForTeam = async (teamName) => {
    try {
        return await Log.find({ teamName: teamName }).populate("item");
    } catch (e) {
        console.error("Logservice get all logs for team error" + e);
        throw e;
    }
};

module.exports.getBorrowedForTeam = async (teamName) => {
    try {
        return await Log.find({ teamName: teamName, type: "borrow", status: "active" }).populate("item");
    } catch (e) {
        console.error("Logservice get borrow logs for team error" + e);
        throw e;
    }
};

module.exports.getOne = async (id) => {
    try {
        const log = await Log.findById(id).populate("item");
        if (!log) {
            throw new Error("Log not found");
        }
        return log;
    } catch (e) {
        console.error("Logservice get one log error" + e);
        throw e;
    }
};

module.exports.createOne = async (body, status = null, session = null) => {
    const args = {
        ...body,
        timestamp: Date.now(),
        status: status ? status : "active",
    };
    const entry = new Log(args);

    try {
        return (await entry.save({ session })).populate("item");
    } catch (e) {
        console.error("Logservice create log error" + e);
        throw e;
    }
};

module.exports.deleteOne = async (id) => {
    try {
        const log = await Log.findByIdAndDelete(id).populate("item");
        if (!log) {
            throw new Error("Log not found");
        }

        return;
    } catch (e) {
        console.error("Logservice delete log error" + e);
        throw e;
    }
};

module.exports.editOne = async (id, updates, session = null) => {
    try {
        const updatedLog = await Log.findByIdAndUpdate(id, updates)
            .populate("item")
            .session(session);

        if (!updatedLog) {
            throw new Error("Log not found");
        }

        return;
    } catch (e) {
        console.error("Logservice edit log error" + e);
        throw e;
    }
};

module.exports.return = async (id) => {
    try {
        const log = await module.exports.getOne(id);
        if (!log) {
            throw new Error("Log not found");
        }

        const item = await itemService.getOne(log.item);
        if (!item) {
            throw new Error("Item not found");
        }

        const updatedItem = await module.exports.editOne(id, {
            status: "closed",
        });

        await itemService.editOne(log.item, {
            quantity: item.quantity + log.quantity,
        });

        await module.exports.createOne(
            {
                teamName: log.teamName,
                item: log.item,
                quantity: log.quantity,
                type: "return",
            },
            "closed"
        );

        return updatedItem;
    } catch (e) {
        console.error("Logservice return item error" + e);
        throw e;
    }
};
