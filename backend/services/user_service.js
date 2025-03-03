const User = require("../models/user");
// const logService = require("./log_service");
const mongoose = require("mongoose");

module.exports.findUserByFirebaseUid = async (firebaseUid) => {
  try {
    const res = await User.findOne({ firebaseUid: firebaseUid });
    return res;
  } catch (e) {
    console.error("Cannot find user by firebase id: " + e);
    throw e;
  }
};

module.exports.createUserByFirebaseUid = async (firebaseUid) => {
  try {
    const newUser = await User.create({
      firebaseUid: firebaseUid,
      userType: "Unauthorized",
    });
    return newUser;
  } catch (e) {
    console.error("Cannot create firebase user with firebase id" + e);
    throw e;
  }
};

module.exports.updateUserByFirebaseUid = async (firebaseUid, body) => {
  try {
    return await User.updateOne(
      { firebaseUid: firebaseUid },
      { $set: { ...body } },
    );
  } catch (e) {
    console.error("Cannot update user with firebase id" + e);
    throw e;
  }
};

module.exports.getUnauthorizedUsers = async () => {
  try {
    return await User.find({ userType: "Unauthorized" });
  } catch (e) {
    console.error("Cannot get unauthorized users" + e);
    throw e;
  }
};

module.exports.getAuthorizedUsers = async () => {
  try {
    return await User.find({ userType: { $ne: "Unauthorized" } });
  } catch (e) {
    console.error("Cannot get authorized users" + e);
    throw e;
  }
};

module.exports.authorizedUserById = async (id) => {
  try {
    return await User.findByIdAndUpdate(id, { userType: "User" });
  } catch (e) {
    console.error("Cannot authorize user" + e);
    throw e;
  }
};
