const Log = require("../models/logs");

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

exports.createOne = async (body) => {
    const args = Object.assign(body, {
        timestamp: Date.now(),
        status: "valid",
    });
    const entry = new Log(args);

    try {
        return await entry.save();
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



// try {

// } catch (e) {
//     switch(e.message) {
//         default:
//             throw e;
//     }
// }