const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type:String,
    },
    email: {
        type:String,
    },
    password: {
        type:String,
    },
    balance: {
        type:Number,
    }
});
let User = mongoose.model("User", userSchema);
module.exports = User;