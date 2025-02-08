// const BorrowHistory = require("../models/borrow_history.js");
// const { body, validationResult } = require("express-validator");

// const borrowHistoryService = require("../services_legacy/borrow_history_service.js");

// exports.borrow_history_list = async (req, res, next) => {
//     try {
//         const borrowHistoryList = await borrowHistoryService.getBorrowHistoryList();
//         res.status(200).send(borrowHistoryList);
//         return;
//     } catch (err) {
//         if(err.message == "Borrow history not found") {
//             res.status(404).send(err);
//             return;
//         }
//         if(err.message == "Failed to get item list fron database") {
//             res.status(404).send(err);
//             return;
//         }
//         res.status(500).send({error: "Internal Server Error"});
//         return;
//     }
// };

// exports.borrow_history_detail = async (req, res, next) => {
//     res.send("NOT IMPLEMENTED: borrow_history detail");
// };

// exports.borrow_history_create = [
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             res.send(errors.array());
//         }
//         else {
//             try {
//                 const newEntry = await borrowHistoryService.createBorrowHistory(req.body);
//                 res.status(201).send("Sucessflly created log entry");
//                 return;
//             } catch (err) {
//                 if(err.message == "Failed to save entry to database") {
//                     res.status(500).send(err);
//                     return;
//                 }
//                 res.status(500).send({error: "Internal Server Error"});
//                 return;
//             }
//         }
//     }
// ]

// exports.item_return = [
//     async (req, res, next) => {
//         try {
//             await borrowHistoryService.returnItem(req.params.id, req.username);
//             res.status(200).send("Sucessfully returned item");
//             return;
//         } catch (err) {
//             if (err.message == "Failed to get user data from database") {
//                 res.status(404).send(err);
//                 return;
//             }
//             if (err.message == "Item not Found") {
//                 res.status(404).send(err);
//                 return;
//             }
//             if (err.message == "Failed to get item data from database") {
//                 res.status(404).send(err);
//                 return;
//             }
//             if ("Failed to get borrow History data from database") {
//                 res.status(404).send(err);
//                 return;
//             }
//             if (err.message == "Failed to save entry to database") {
//                 res.status(500).send(err);
//                 return;
//             }
//             if (err.message == "Not a valid borrow request: items unavailable") {
//                 res.status(400).send(err);
//                 return;
//             }
//             res.status(500).send(err);
//             return;
//         }
//     },
// ];

// exports.borrow_history_delete = [
//     async (req, res, next) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             res.send(errors.array());
//             return;
//         }
//         else {
//             const id = req.params.id;
//             try {
//                 const deletedEntry = await borrowHistoryService.deleteEntry(id);
//                 res.status(200).send("Successfully deleted entry");
//                 return deletedEntry;
//             } catch (err) {
//                 if(err.message == "Entry not found") {
//                     res.status(404).send(err);
//                     return;
//                 }
//                 res.status(500).send(err);
//                 return;
//             }
//         }
//     },
// ];