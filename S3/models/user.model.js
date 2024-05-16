
const mongoose = require("mongoose");

// schema
const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true },
    is_Marrid: { type: Boolean, require: true },
    location: { type: String, require: true },
})
// modal
const UserModal = mongoose.model("user", userSchema);


module.exports = {
    UserModal
}