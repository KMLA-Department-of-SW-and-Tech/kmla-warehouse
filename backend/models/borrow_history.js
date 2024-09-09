const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const borrowHistorySchema = new Schema({
    item: {type: Schema.Types.ObjectId, }
})