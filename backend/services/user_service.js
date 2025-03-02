const User = require("../models/user");
// const logService = require("./log_service");
const mongoose = require("mongoose");

module.exports.findUserByFirebaseUid = async (firebaseUid) => {
    try {
        return await User.findOne({ firebaseUid: firebaseUid });
    } catch (e) {
        console.log("Cannot find user by firebase id: ", e);
        throw e;
    }
}

module.exports.createUserByFirebaseUid = async (firebaseUid) => {
    try {
        const newUser = await User.create({
            firebaseUid: firebaseUid,
            userType: "Unauthorized",
        });
        return newUser;
    } catch (e) {
        console.log("Cannot create firebase user with firebase id", e);
        throw e;
    }
}

module.exports.updateUserByFirebaseUid = async (firebaseUid, body) => {
    try {
        return await User.updateOne({ firebaseUid: firebaseUid }, { $set: { ...body } });
    } catch (e) {
        console.log("Cannot update user with firebase id", e);
        throw e;
    }
}

module.exports.getUnauthorizedUsers = async () => {
    try {
        return await User.find({ userType: "Unauthorized" });
    } catch (e) {
        console.log("Cannot get unauthorized users", e);
        throw e;
    }
}

module.exports.getAuthorizedUsers = async () => {
    try {
        return await User.find({ userType: { $ne: "Unauthorized" } });
    } catch (e) {
        console.log("Cannot get authorized users", e);
        throw e;
    }
}

module.exports.authorizedUserById = async (id) => {
    try {
        return await User.updateOne({ id: id, userType: "Unauthorized" }, { $set: { userType: "User" } });
    } catch (e) {
        console.log("Cannot authorize user", e);
        throw e;
    }
}

// exports.getAll = async () => {
//     try {
//         return await Item.find({});
//     } catch (e) {
//         throw(e);
//     }
// }

// exports.getAvailableForTeam = async (teamName) => {
//     try {
//         const teamLogs = (await logService.getAllForTeam(teamName)).filter(log => log.item.status === "valid");
//         return teamLogs.map(log => log.item);
//     } catch (e) {
//         throw(e);
//     }
// }

// exports.getAllForTeam = async (teamName) => {
//     try {
//         const teamLogs = logService.getAllForTeam(teamName);
//         return teamLogs.map(log => log.item);
//     } catch (e) {
//         throw(e);
//     }
// }

// exports.getOne = async (id, session=null) => {
//     try {
//         const log = await Item.findById(id).session(session);
//         if(!log) {
//             throw new Error("Item not found");
//         } 
//         return log;
//     } catch (e) {
//         throw(e);
//     }
// }

// exports.createOne = async (body) => {
//     const args = Object.assign(body, {
//         totalQuantity: body.quantity,
//         status: "valid",
//     });
//     const entry = new Item(args);

//     try {
//         const newItem = await entry.save();
        
//         if(!newItem) {
//             throw new Error("Item not created");
//         }

//         return newItem;s
//     } catch (e) {
//         throw(e);
//     }
// }

// exports.editOne = async (id, updates, session=null) => {
//     try {
//         const updatedItem = await Item.findByIdAndUpdate(id, updates).session(session);

//         if (!updatedItem) {
//             throw new Error("Item not found");
//         }

//         return updatedItem;
//     } catch (e) {
//         throw(e);
//     }
// }

// exports.deleteOne = async (id) => {
//     try {
//         const deletedItem = await Item.findByIdAndUpdate(id, {status: "deleted"});

//         if (!deletedItem) {
//             throw new Error("Item not found");
//         }

//         return deletedItem;
//     } catch (e) {
//         throw e;
//     }
// }

// exports.borrow = async (id, body) => {
//     // const session = await mongoose.startSession();
//     // session.startTransaction();

//     try {
//         const {quantity, user} = body;

//         console.log(quantity, user);

//         const prevItemState = await exports.getOne(id);

//         if(!prevItemState) {
//             throw new Error("Item not found");
//         }

//         if(quantity > prevItemState.quantity) {
//             throw new Error("Invalid quantity");
//         }

//         const updatedItem = await exports.editOne(id, {quantity: prevItemState.quantity - quantity});

//         await logService.createOne({
//             user,
//             item: id,
//             quantity,
//             type: "borrow",
//         });

//         // await session.commitTransaction();
//         // session.endSession();

//         return updatedItem;
//     } catch (e) {
//         // await session.abortTransaction();
//         // session.endSession();
//         throw e;
//     }
// }