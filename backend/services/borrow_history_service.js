const borrowHistory = require("../models/borrow_history");

exports.getAll = async () => {
    try {
        return await borrowHistory.find({}).exec();
    } catch (e) {
        switch(e.message) {
            default:
                throw e;
        }
    }
}

exports.getOne = async (id) => {
    try {
        return await borrowHistory.findById(id).exec();
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
    const entry = new borrowHistory(args);

    console.log(entry);

    try {
        return await entry.save();
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