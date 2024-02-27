const mongoose = require("mongoose")
const ExpenseSchema = new mongoose.Schema ({
    Description: {
        type: String,
        required: true 
    },
    Amount: {
        type: Number,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Memo: {
        type: String
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

module.exports = mongoose.model("Expense", ExpenseSchema) 