const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://127.0.0.1:27017/instagram")


// schema.

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    is_Marrid: Boolean,
    location: String
})

const UserModal = mongoose.model("user", userSchema)
module.exports = { connection, UserModal }