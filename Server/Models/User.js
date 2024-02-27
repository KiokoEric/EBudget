const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({ 
    Name: {
        type: String,
        required:true
    },
    Email: {
        type: String,
        required:true
    },
    Password: {
        type: String,
        required:true,
        min: 8
    },
    Date: {
        type: Date,
        default: Date.now 
    },
})

module.exports = mongoose.model("User", UserSchema) 