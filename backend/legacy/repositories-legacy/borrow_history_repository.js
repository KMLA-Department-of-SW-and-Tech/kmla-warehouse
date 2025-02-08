// const BorrowHistory = require("../models/borrow_history");
// const { body, validationResult } = require("express-validator");

// exports.getAllBorrowHistory = async () => {
//     const borrowHistoryList = await BorrowHistory.find({})
//     .populate('item')
//     .populate('user')
//     .sort({name: 1})
//     .exec();
//     return borrowHistoryList;
// };

// exports.getHistoryById = async (logId) => {
//     const borrowHistory = await BorrowHistory.findById(logId)
//     .populate('item')
//     .populate('user')
//     .exec();
//     return borrowHistory;
// };

// // Will implement search

// exports.saveBorrowHistory = async (entry) => {
//     const newEntry = await entry.save();
//     return newEntry;
// }

// exports.getUserBorrowHistory = async (userId) => {
//     const borrowHistoryList = await BorrowHistory.find({user: userId})
//     .populate('item')
//     .populate('user')
//     .sort({timestamp: 1})
//     .exec();
//     return borrowHistoryList;
// };

// exports.findByIdAndUpdate = async (entry, id) => {
//     entry._id = id;
//     return await BorrowHistory.findByIdAndUpdate(id, entry, {});
// };
