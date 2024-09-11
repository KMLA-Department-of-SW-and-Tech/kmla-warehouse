const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");

exports.admin_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: admin detail");
});

exports.admin_create = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: admin create");
});

exports.admin_update_put = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: admin update put");
});

exports.admin_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: admin delete");
});