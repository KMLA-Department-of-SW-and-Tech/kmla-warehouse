const Item = require("../models/item");
const logService = require("./log_service");
const userService = require("./user_service");
const teamConfig = require("../config/team-config");

module.exports.getAvailable = async () => {
  try {
    return await Item.find({ status: "valid" });
  } catch (e) {
    console.error("Itemservice get available item list error" + e);
    throw e;
  }
};

// module.exports.getAll = async () => {
//     try {
//         return await Item.find({});
//     } catch (e) {
//         throw(e);
//     }
// }

module.exports.getAvailableForTeam = async (firebaseUid) => {
  try {
    const userData = await userService.findUserByFirebaseUid(firebaseUid);
    const teamName = userData.teamName;
    const teamLogs = (await logService.getBorrowedForTeam(teamName)).filter(
      (log) => log.item.status === "valid"
    );
    return teamLogs;
  } catch (e) {
    console.error("Itemservice get available item for team error" + e);
    throw e;
  }
};

// module.exports.getAllForTeam = async (teamName) => {
//     try {
//         const teamLogs = logService.getAllForTeam(teamName);
//         return teamLogs.map(log => log.item);
//     } catch (e) {
//         throw(e);
//     }
// }

module.exports.getOne = async (id, session = null) => {
  try {
    const log = await Item.findById(id).session(session);
    if (!log) {
      throw new Error("Item not found");
    }
    return log;
  } catch (e) {
    console.error("Itemservice get one item error" + e);
    throw e;
  }
};

module.exports.createOne = async (body) => {
  const args = Object.assign(body, {
    totalQuantity: body.quantity,
    status: "valid",
  });
  const entry = new Item(args);

  try {
    const newItem = await entry.save();

    if (!newItem) {
      throw new Error("Item not created");
    }

    return newItem;
    s;
  } catch (e) {
    console.error("Itemservice create item error" + e);
    throw e;
  }
};

module.exports.editOne = async (id, updates, session = null) => {
  try {
    const originalItem = await Item.findById(id);
    if (!originalItem) {
      throw new Error("Item not found");
    }
    const changeInQ = updates.totalQuantity - originalItem.totalQuantity;
    const originalQ = originalItem.quantity;
    const updatedItem = await Item.findByIdAndUpdate(id, {
      quantity: originalQ + changeInQ,
      ...updates,
    }).session(session);

    return updatedItem;
  } catch (e) {
    console.error("Itemservice edit item error" + e);
    throw e;
  }
};

module.exports.deleteOne = async (id) => {
  try {
    const deletedItem = await Item.findByIdAndUpdate(id, {
      status: "deleted",
    });

    if (!deletedItem) {
      throw new Error("Item not found");
    }

    return deletedItem;
  } catch (e) {
    console.error("Itemservice delete item error" + e);
    throw e;
  }
};

module.exports.borrow = async (id, body, userFirebaseUid) => {
  try {
    const { quantity } = body;
    const user = await userService.findUserByFirebaseUid(userFirebaseUid);
    const teamName = user.teamName;
    if (teamName === teamConfig.noTeamNameAvailable)
      throw new Error("User has no team assigned");

    const prevItemState = await module.exports.getOne(id);

    if (!prevItemState) {
      throw new Error("Item not found");
    }

    if (quantity > prevItemState.quantity) {
      throw new Error("Invalid quantity");
    }

    const updatedItem = await module.exports.editOne(id, {
      quantity: prevItemState.quantity - quantity,
    });

    await logService.createOne({
      teamName,
      userFirebaseUid,
      item: id,
      quantity,
      type: "borrow",
    });

    return updatedItem;
  } catch (e) {
    console.error("Itemservice borrow item error" + e);
    throw e;
  }
};
